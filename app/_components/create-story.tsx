"use client";
import { queryClient } from "@/app/query-client-provider";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { storage } from "@/firebase";
import setCanvasPreview from "@/set-canvas-preview";
import { Box, Grid } from "@radix-ui/themes";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import NextImage from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";

const ASPECT_RATIO = 4 / 6;
const MIN_DIMENSION = 150;

interface Props {
  userId: string;
  userImage: string;
  userName: string;
}

const CreateStory = ({ userImage, userName, userId }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Grid
          rows={{ initial: "1fr 60px", md: "1fr 60px" }}
          className="overflow-hidden rounded-xl border cursor-pointer asis-1/3 lg:basis-1/4 h-[180px] lg:h-[200px]"
        >
          <Box className="overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <NextImage
                src={userImage}
                width={200}
                height={200}
                alt={userName.toLocaleUpperCase()}
                className="w-full h-full object-cover"
              />
            </div>
          </Box>
          <Box>
            <div className="w-full h-full flex items-end pb-2 justify-center relative">
              <div className="absolute -top-5 bg-white w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center">
                <HiOutlinePlus className="text-2xl" />
              </div>
              <span className="text-sm">Create Story</span>
            </div>
          </Box>
        </Grid>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select an image for story</AlertDialogTitle>
          <AlertDialogDescription>
            <label className="block mb-3 w-fit">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" accept="image/*" onChange={onSelectFile} />
            </label>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc && (
              <div className="flex flex-col items-center relative">
                <ReactCrop
                  crop={crop}
                  onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Upload"
                    style={{ maxHeight: "70vh" }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                {loading && (
                  <div className="w-full h-full bg-black/60 absolute flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                )}
              </div>
            )}
            {crop && (
              <canvas
                ref={previewCanvasRef}
                className="mt-4"
                style={{
                  display: "none",
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              if (imgRef.current && previewCanvasRef.current && crop) {
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                const response = await fetch(dataUrl);
                const blob = await response.blob();

                const storageRef = ref(storage, `${Date.now()}`);
                await uploadBytesResumable(storageRef, blob).then(() => {
                  getDownloadURL(storageRef).then(
                    async (downloadURL: string) => {
                      setLoading(false);
                      setOpen(false);
                      axios
                        .post("/api/storys", {
                          userId,
                          image: downloadURL,
                        })
                        .then(() =>
                          queryClient.invalidateQueries({
                            queryKey: ["storys"],
                          })
                        );
                    }
                  );
                });
              }
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateStory;
