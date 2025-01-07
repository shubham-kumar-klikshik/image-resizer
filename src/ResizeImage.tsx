import { useEffect, useState } from "react";
import Pica from "pica";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { VisuallyHiddenInput } from "./VisuallyHiddenInput";

function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );

  const [resizedImageUrl, setResizedImageUrl] = useState("");
  const [resizedImage, setResizedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [resizedImageSize, setResizedImageSize] = useState(0);
  const [desiredQuality, setDesiredQuality] = useState(0.6);
  const [desiredWidth, setDesiredWidth] = useState(2560);
  const [disableDownload, setDisableDownload] = useState(true);

  useEffect(
    function () {
      if (resizedImageUrl) {
        const img = new Image();
        img.src = resizedImageUrl;
        img.onload = () => {
          setResizedImage(img);
        };
      }
    },
    [resizedImageUrl]
  );

  const fileSize =
    file?.size &&
    (file?.size > 1000000
      ? `${(file?.size / 1000000).toFixed(2)} MB`
      : `${(file?.size / 1000).toFixed(2)} KB`);

  const pica = new Pica();

  const downloadImage = () => {
    if (resizedImageUrl) {
      const a = document.createElement("a");
      a.href = resizedImageUrl;
      a.download = "resized-image.jpg";
      a.click();
    }
  };

  const resizeImage = async () => {
    if (!originalImage) return;

    // Create canvas elements for input and output
    const inputCanvas = document.createElement("canvas");
    const outputCanvas = document.createElement("canvas");

    // Set dimensions for the input canvas based on the original image
    inputCanvas.width = originalImage.width;
    inputCanvas.height = originalImage.height;

    // Draw the image onto the input canvas
    const ctx = inputCanvas.getContext("2d");
    ctx?.drawImage(originalImage, 0, 0);

    // Set the desired dimensions for the output canvas
    const desiredHeight =
      (originalImage.height * desiredWidth) / originalImage.width;
    outputCanvas.width = desiredWidth;
    outputCanvas.height = desiredHeight;

    try {
      // Use Pica to resize the image
      const result = await pica.resize(inputCanvas, outputCanvas);

      // Convert the resized canvas to a Blob
      const blob = await pica.toBlob(result, "image/jpeg", desiredQuality);

      setResizedImageSize(blob.size);

      setDisableDownload(false);
      // Create a URL for the Blob and set the resizedImageUrl state
      setResizedImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error resizing image:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h2">Image Resizer</Typography>

      {/* Upload */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload image
          <VisuallyHiddenInput
            type="file"
            // multiple
            accept="image/*"
            onChange={(e) => {
              setDisableDownload(true);
              const file = e.target.files?.[0];
              if (file) {
                setFile(file);
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => setOriginalImage(img);
              }
            }}
          />
        </Button>
        {file && (
          <>
            <Typography sx={{ mt: 1 }} variant="subtitle1">
              Name: {file.name}
            </Typography>
            <Typography variant="subtitle1">
              Dimensions: ({originalImage?.width} X {originalImage?.height})
            </Typography>
            <Typography variant="subtitle1">Size: {fileSize}</Typography>
          </>
        )}
      </Box>

      {/* Resize */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          disabled={!originalImage}
          sx={{ width: "100px" }}
          size="small"
          label="Width"
          type="number"
          value={desiredWidth}
          onChange={(e) => {
            setDisableDownload(true);
            setDesiredWidth(Number(e.target.value));
          }}
          slotProps={{
            input: {
              inputProps: { min: 1 },
            },
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          disabled={!originalImage}
          sx={{ width: "100px" }}
          size="small"
          label="Quality"
          type="number"
          value={desiredQuality}
          onChange={(e) => {
            setDisableDownload(true);
            setDesiredQuality(Number(e.target.value));
          }}
          slotProps={{
            input: {
              inputProps: { min: 0, max: 1, step: 0.1 },
            },
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={!originalImage}
          onClick={resizeImage}
        >
          Resize Image
        </Button>
      </Box>

      {/* Download */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          disabled={!resizedImageUrl || disableDownload}
          onClick={downloadImage}
        >
          Download Image
        </Button>
        {resizedImage && !disableDownload && (
          <>
            <Typography sx={{ mt: 1 }} variant="subtitle1">
              Dimensions: ({resizedImage?.width} X {resizedImage?.height})
            </Typography>
            <Typography variant="subtitle1">
              Size:{" "}
              {resizedImageSize > 1000000
                ? `${(resizedImageSize / 1000000).toFixed(2)} MB`
                : `${(resizedImageSize / 1000).toFixed(2)} KB`}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default ResizeImage;
