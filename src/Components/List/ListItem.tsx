"use client";
import noImage from "@/app/no-image.svg";
import properties from "@/types/OpenTripMap/properties";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { relative } from "path";
import React, { useEffect, useState } from "react";

export default function ListItem({
  xid,
  timeout,
}: {
  xid: string;
  timeout: number;
}) {
  const [isLoading, setIsLoadig] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>("");
  const [properties, setProperties] = useState<properties>();
  const [errorImage, setErrorImage] = useState<string | null>();

  useEffect(() => {
    const getProperties = async () => {
      setIsLoadig(false);
      const data = await fetch("/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ xid: xid }),
      });
      const res = await data.json();
      console.log(res);
      setIsLoadig(false);
      setProperties(res);
    };
    setTimeout(async () => {
      await getProperties();
    }, timeout);
  }, []);

  useEffect(() => {
    const getPhoto = async (photoRef: string | undefined) => {
      const data = await fetch("/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "image/*",
        },
        body: JSON.stringify({ photoRef: photoRef }),
      });
      const res = await data.blob();
      setImage(URL.createObjectURL(res));
    };
    if (properties?.preview?.source) {
      setErrorImage(null);
      setTimeout(() => {
        console.log;
        getPhoto(properties.preview?.source);
      }, timeout);
    } else setErrorImage(noImage);
  }, [properties]);

  return (
    <>
      <Card
        style={{
          margin: 10,
          border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <CardContent
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Grid container>
            <Grid xs={3} style={{ position: "relative" }}>
              {image && !errorImage ? (
                <Image
                  src={image}
                  alt={properties?.name as string}
                  width={0}
                  height={0}
                  sizes="100dvh"
                  objectFit="contain"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                />
              ) : !errorImage ? (
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  animation="wave"
                />
              ) : (
                <Image src={errorImage} width={100} height={100} alt="error" />
              )}
            </Grid>
            <Grid xs={8} marginLeft={1}>
              <Paper elevation={2}>
                {isLoading ? (
                  <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
                ) : (
                  <>
                    <Typography
                      align="center"
                      style={{ marginBottom: 10, fontSize: "1.2rem" }}
                    >
                      {properties?.name}
                    </Typography>
                    <Typography>
                      {properties?.address?.country},{" "}
                      {properties?.address?.state}, {properties?.address?.city},{" "}
                      {properties?.address?.neighbourhood}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            Add to favorite
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
