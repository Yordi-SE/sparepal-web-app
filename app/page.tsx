import Image from "next/image";
import FormPage from "./components/Formpage";
import Form from "./components/Form1";
import AddressForm from "./components/Form2";
import ManagerForm from "./components/Form3";
import Nav from "./components/Nav";
import ProductSection from "./components/ProductSection";
import { data, Product } from "@/lib/data";
import Footer from "./components/Footer";
import VisionAndMission from "./components/VisionAndMission";
import FrontPage from "./components/FrontPage";

export default function Home() {
  return (
    <>
      <Nav />
      <FrontPage data={data} />
      <ProductSection products={Product} />
      <VisionAndMission />
      <Footer />
    </>
  );
}
