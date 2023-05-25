import '../styles/tailwind.css'
import React from "react";
import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        const Layout = Component.layout || (({children}) => <>{children}</>);
        return (
            <React.Fragment>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=yes"
                    />
                    <title>Их дээд сургуулийн нэгдсэн платформ</title>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </React.Fragment>
        )
    }
}