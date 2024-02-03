"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Videocomponent() {
  const videoPrefix =
    "https://storage.cloud.google.com/yt-processed-videos-001/";
  const videoSrc = useSearchParams().get("v");

  return (
    <div className="h-screen bg-white w-full">
      <div className="flex justify-between items-center h-20 bg-red-600 text-white relative shadow-sm font-bold text-2xl px-5">
        WatchPage
      </div>
      <div className=" w-full h-auto flex items-center justify-center py-10">
        <video
          controls
          className="w-1/2 h-1/2"
          src={videoPrefix + videoSrc}
        ></video>
      </div>
    </div>
  );
}

const Watchpage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Videocomponent />
      </Suspense>
    </div>
  );
};

export default Watchpage;
