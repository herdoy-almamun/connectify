"use client";
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
import { handleUpload } from "@/lib/utils";
import setCanvasPreview from "@/set-canvas-preview";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";

const ASPECT_RATIO = 4 / 4;
const MIN_DIMENSION = 150;

const UpdateProfileImage = () => {
  const { data: session } = useSession();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
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

  if (!session || !session.user) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Flex
          align="center"
          justify="center"
          className="w-9 h-9 rounded-full  bg-gray-900 text-gray-200 hover:bg-gray-700 transition cursor-pointer"
        >
          <FaRegEdit />
        </Flex>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
                  circularCrop
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

                const downloadURL = await handleUpload(dataUrl);
                axios
                  .put(`/api/users/${session.user.id}`, {
                    image: downloadURL,
                  })
                  .then(() => {
                    setLoading(false);
                    setOpen(false);
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

export default UpdateProfileImage;
