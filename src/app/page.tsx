"use client";

import Navbar from "@/components/Navbar";
import { getVideos } from "@/utils/functions";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Video } from "@/utils/functions";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVids = await getVideos();

        if (allVids) {
          const processedVids = allVids.filter(
            (vid) => vid.status !== "processing"
          );
          setVideos(processedVids);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-white h-screen">
      <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {videos.map((video) => (
            <Link key={video.id} href={`/watch?v=${video.filename}`}>
              <div className="bg-gray-200 rounded-lg p-4 cursor-pointer">
                <Image
                  src={"/thumbnail.png"}
                  alt={"video"}
                  width={300}
                  height={200}
                  className="rounded-lg w-full"
                />
                <h2 className="text-xl font-bold mt-2">{video.title}</h2>
                <p className="text-gray-500">{video.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}

export const revalidate = 30;
