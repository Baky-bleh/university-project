import React from 'react'
import Image from "next/image";
import Callpro from "/public/callpro-platform.png"

const config = {
    logo: <Image
                alt="callpro"
                className="w-28 border-none mr-4 inline-block whitespace-nowrap leading-relaxed"
                src={Callpro}
                width={404}
                height={180}
            />,
    project: {
        link: 'https://github.com/beegi22/platform-android-sdk',
    },
    footer: {
        text: 'Copyright ©' + new Date().getFullYear(),
    },
    toc: {
        title: "Гарчиг"
    },
    primaryHue: 190,
    editLink: {
        text: ""
    },
    feedback: {
        content: ""
    }
}

export default config