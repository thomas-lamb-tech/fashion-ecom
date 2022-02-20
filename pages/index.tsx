import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { db } from "./../firebase/firebase";
import useWindowSize from "../components/Util/useWindowSize";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GhostButton from "../components/Buttons/GhostButton";
import Button from "../components/Buttons/Button";
import Slideshow from "../components/HeroSection/Slideshow";
import OverlayContainer from "../components/OverlayContainer/OverlayContainer";
import Card from "../components/Card/Card";
import TestiSlider from "../components/TestiSlider/TestiSlider";
import { itemType } from "../context/cart/cart-types";

// /bg-img/ourshop.png
import ourShop from "../public/bg-img/ourshop.png";

type Props = {
  products: itemType[];
};

const Home: React.FC<Props> = ({ products }) => {
  const t = useTranslations("Index");
  const [totalItems, setTotalItems] = useState(8);
  const [viewWidth] = useWindowSize();

  const currentItems = products.slice(0, totalItems);

  // Change totalItems to 8 for good layout
  const changeTotalItems = useCallback(() => {
    // if (viewWidth < 992) return;
    if (viewWidth >= 992 || viewWidth < 576) {
      totalItems !== 10 && setTotalItems(10);
    } else if (viewWidth >= 768) {
      totalItems !== 8 && setTotalItems(8);
    } else {
      totalItems !== 9 && setTotalItems(9);
    }
  }, [viewWidth]);

  useEffect(() => {
    changeTotalItems();
  }, [changeTotalItems]);

  return (
    <div>
      <Header />
      <Slideshow />
      <section className="w-full h-auto px-2 sm:px-8 md:px-16 py-10 border border-b-2 border-gray100">
        <div className="h-full flex flex-col md:flex-row">
          <div className="h-full w-full md:w-1/3 lg:w-1/2 p-4">
            <OverlayContainer
              imgSrc="/bg-img/banner_minipage1.jpg"
              imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
            >
              <Link href="/new-arrivals">
                <GhostButton
                  value={t("new_arrivals")}
                  size="xl"
                  inverted
                  noBorder
                  extraClass="absolute bottom-10-per right-10-per z-20"
                />
              </Link>
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage2.jpg">
              <Link href="/product-category/women">
                <GhostButton
                  value={t("women_collection")}
                  size="lg"
                  inverted
                  noBorder
                  extraClass="absolute bottom-10-per z-20"
                />
              </Link>
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage3.jpg">
              <Link href="/product-category/men">
                <GhostButton
                  value={t("men_collection")}
                  size="lg"
                  inverted
                  noBorder
                  extraClass="absolute bottom-10-per z-20"
                />
              </Link>
            </OverlayContainer>
          </div>
        </div>
      </section>
      <section className="w-full h-full flex flex-col justify-center md:items-center mt-16 mb-20">
        <div className="flex justify-center">
          <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8">
            <h4 className="text-3xl mb-4">{t("best_selling")}</h4>
            <span>{t("best_selling_desc")}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 px-4 sm:px-16 md:px-20">
          <Card key={currentItems[3].id} item={currentItems[3]} />
          <Card key={currentItems[4].id} item={currentItems[4]} />
          <Card key={currentItems[2].id} item={currentItems[2]} />
          <Card key={currentItems[5].id} item={currentItems[5]} />
        </div>
      </section>
      <section className="w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen">
        <h4 className="text-3xl">{t("testimonial")}</h4>
        <TestiSlider />
      </section>

      <section className="px-4 sm:px-8 md:px-16 my-16 flex flex-col lg:items-center">
        <div className="text-center mb-6">
          <h4 className="text-3xl">{t("featured_products")}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
          {currentItems.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            value={t("see_more")}
            onClick={() => setTotalItems((prevState) => prevState * 2)}
          />
        </div>
      </section>

      <div className="border-gray100 border-b-2"></div>

      <section className="mt-16 mb-20 flex flex-col justify-center items-center text-center">
        <div className="textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6">
          <h4 className="text-3xl mb-6">{t("our_shop")}</h4>
          <span className="w-full">{t("our_shop_desc")}</span>
        </div>
        <div className="w-full px-6 sm:px-20 flex justify-center">
          <Image src={ourShop} alt="Our Shop" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let products: itemType[] = [];
  const res = await db.collection("products").get();
  res.forEach((doc) => {
    let docData = doc.data();
    products = [
      ...products,
      {
        id: docData.id,
        name: docData.name,
        price: docData.price,
        img1: docData.img1,
        img2: docData.img2,
      },
    ];
  });
  return {
    props: {
      messages: {
        // ...require(`../messages/index/${locale}.json`),
        ...require(`../messages/common/${locale}.json`),
      },
      products,
    }, // will be passed to the page component as props
  };
};

export default Home;
