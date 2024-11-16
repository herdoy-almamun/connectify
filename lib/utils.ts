import { storage } from "@/firebase";
import { clsx, type ClassValue } from "clsx";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toDateString();
}

export const handleUpload = async (image: string): Promise<string> => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, `${Date.now()}`);

    // Upload the image to Firebase Storage
    await uploadBytesResumable(storageRef, blob);

    // Get the download URL after the upload is complete
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL; // Return the download URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Upload failed"); // Or return null/empty string if you'd prefer
  }
};
