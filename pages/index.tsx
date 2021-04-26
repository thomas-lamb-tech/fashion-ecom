import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import GhostButton from "../components/Buttons/GhostButton";
import Button from "../components/Buttons/Button";
import TextButton from "../components/Buttons/TextButton";
import Input from "../components/Input";
import Slideshow from "../components/HeroSection/Slideshow";
import Image from "next/image";
import OverlayContainer from "../components/Util/OverlayContainer";
import Card from "../components/Card";
import Card3 from "../components/Card/Card3";
import Card5 from "../components/Card/Card5";
import TestiSlider from "../components/TestiSlider";
import { default as featuredItems } from "../components/Util/Items";
import { useState } from "react";

export default function Home() {
  const [totalItems, setTotalItems] = useState(10);

  const currentItems = featuredItems.slice(0, totalItems);

  // let arrItems = [];

  // for (let i = 1; i <= totalItems; i++) {
  //   arrItems = [...arrItems, i];
  // }

  return (
    <div className="">
      <Header />
      {/* <HeroSection /> */}
      <Slideshow />
      <section className="w-full h-auto px-16 py-10 border border-b-2 border-gray100">
        <div className="h-full flex flex-col md:flex-row">
          <div className="h-full w-full md:w-1/2 p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage1.jpg">
              <GhostButton
                value="New Arrivals"
                size="xl"
                inverted
                noBorder
                extraClass="absolute bottom-10-per right-10-per z-20"
              />
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage2.jpg">
              <GhostButton
                value="Women Collection"
                size="lg"
                inverted
                noBorder
                extraClass="absolute bottom-10-per z-20"
              />
            </OverlayContainer>
          </div>
          <div className="w-full md:w-1/4 bg-cover p-4">
            <OverlayContainer imgSrc="/bg-img/banner_minipage3.jpg">
              <GhostButton
                value="Men Collection"
                size="lg"
                inverted
                noBorder
                extraClass="absolute bottom-10-per z-20"
              />
            </OverlayContainer>
          </div>
        </div>
      </section>
      <section className="w-full h-full flex flex-col justify-center items-center mt-16 mb-20">
        <div className="w-1/3 text-center mb-8">
          <h4 className="text-3xl mb-4">Best Selling</h4>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugit
            aliquam hic, voluptatibus iste consectetur odit
          </span>
        </div>
        <div className="flex flex-col md:flex-row w-full px-20">
          <Card3
            imgSrc1="/bg-img/woman-hoodie-1.jpg"
            imgSrc2="/bg-img/women-shortpatch-a1.jpg"
            itemName="Shortpatch"
            itemPrice={200.0}
          />
          <Card3
            imgSrc1="/bg-img/women-relaxedshirt-a2.jpg"
            imgSrc2="/bg-img/woman-hoodie-1.jpg"
            itemName="Relaxed Shirt"
            itemPrice={130.0}
          />
          <Card3
            imgSrc1="/bg-img/women-shortpatch-a1.jpg"
            imgSrc2="/bg-img/woman-hoodie-1.jpg"
            itemName="HodieS"
            itemPrice={230.0}
          />
        </div>
      </section>
      <section className="w-full h-full py-16 flex flex-col items-center bg-lightgreen">
        <h4 className="text-3xl">Testimonial</h4>
        <TestiSlider />
      </section>

      <section className="px-16 my-16 flex flex-col items-center">
        <div className="text-center mb-6">
          <h4 className="text-3xl">Featured Products</h4>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full mb-8">
          {currentItems.map((item) => (
            <Card5
              key={item.name}
              imgSrc1={item.img1}
              imgSrc2={item.img2}
              itemName={item.name}
              itemPrice={item.price}
            />
          ))}
        </div>
        <span
          className="cursor-pointer"
          onClick={() => setTotalItems((prevState) => prevState * 2)}
        >
          <Button value="See More" />
        </span>
      </section>

      <div className="border-gray100 border-b-2"></div>

      <section className="mt-16 mb-20 flex flex-col justify-center items-center text-center">
        <div className="textBox w-2/5 mb-6">
          <h4 className="text-3xl mb-6">Our Shop</h4>
          <span>
            Stop by our stores to learn the stories behind our products, get a
            personal styling session, or shop the latest in person. See our
            store locations.
          </span>
        </div>
        <div className="w-full px-20 flex justify-center">
          <img className="w-full" src="/bg-img/ourshop.png" alt="Our Shop" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

{
  /* <div
              className="h-full bg-yellow flex flex-col items-center justify-center"
              style={{ width: "700px" }}
            >
              <div className="textiContainer text-center w-4/5">
                <span className="mb-5">{testi[0].speech}</span>
                <h5 className="font-bold">{testi[0].name}</h5>
              </div>
            </div>
            <div className="h-full bg-red" style={{ width: "700px" }}></div>
            <div className="h-full bg-blue" style={{ width: "700px" }}></div> */
}