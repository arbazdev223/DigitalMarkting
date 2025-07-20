import { useState, useEffect } from "react";
import { FRONTEND_URL } from "../config";

export function useBlobUrl(fileUrl) {
  const [blobUrl, setBlobUrl] = useState("");
  useEffect(() => {
    let revoked = false;
    if (!fileUrl) return;
    const accessUrl =
      fileUrl.startsWith("http") || fileUrl.startsWith("blob:")
        ? fileUrl
        : `${FRONTEND_URL}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
    fetch(accessUrl)
      .then((res) => res.blob())
      .then((blob) => {
        if (!revoked) {
          const bUrl = URL.createObjectURL(blob);
          setBlobUrl(bUrl);
        }
      });
    return () => {
      revoked = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [fileUrl]);
  return blobUrl;
}
