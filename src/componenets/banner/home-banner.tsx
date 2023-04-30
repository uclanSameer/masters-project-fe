import Image from "next/image";

export default function Banner(bannerProps: BannerProps) {
    const { imageUrl, title, subtitle } = bannerProps;

    return (
        <div className="relative h-96">
          <Image
            src={imageUrl}
            alt= {title}
            fill={true}
            quality={100}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl">{subtitle}</p>
          </div>
        </div>
      );
    

}

export interface BannerProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}