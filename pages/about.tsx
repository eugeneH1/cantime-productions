// app/page.tsx
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import Modal from "../components/Modal";
import type { ImageProps } from "../utils/types";
import { useSearchParams } from "next/navigation";

// Server-side function to fetch the data from Cloudinary
export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  let images: ImageProps[] = results.resources.map((resource, index) => ({
    id: index,
    height: resource.height,
    width: resource.width,
    public_id: resource.public_id,
    format: resource.format,
  }));

  const blurImagePromises = images.map((image: ImageProps) =>
    getBase64ImageUrl(image)
  );
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  images = images.map((image, index) => ({
    ...image,
    blurDataUrl: imagesWithBlurDataUrls[index],
  }));

  return {
    props: {
      images,
    },
  };
}

// Main Home Page Component
export default function Home({ images }: { images: ImageProps[] }) {
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photoId");
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <Modal
          images={images}
          onClose={() => setLastViewedPhoto(photoId)}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            as={`/p/${id}`}
            shallow
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            className="group relative mb-5 block w-full cursor-zoom-in"
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition group-hover:brightness-110"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
