import BackImage from "../public/img-1-1000x600.jpg"
import Image from "next/image";

export default function Loading(){
    return(
        <div>
            <div className="bg-cover fixed z-40 w-full h-full top-0 left-0">
                <Image
                    src={BackImage}
                    alt="background-image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <div className="top-0 left-0 w-full h-full block z-50 absolute bg-black bg-opacity-50"/>
            <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
                <div className="block mb-4">
                    <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"/>
                </div>
                <h4 className="text-lg font-medium text-white">
                    Loading page ...
                </h4>
            </div>
        </div>
    )
}