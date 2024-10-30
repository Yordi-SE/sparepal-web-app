import dynamic from "next/dynamic";
import { data, Product } from "@/lib/data";

const FrontPage = dynamic(() => import("./components/FrontPage"), {
  ssr: false,
});
const ProductSection = dynamic(() => import("./components/ProductSection"), {
  ssr: false,
});
const VisionAndMission = dynamic(() => import("./components/VisionAndMission"), {
  ssr: false,
});
const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});
const Nav = dynamic(() => import("./components/Nav"), {
  ssr: false,
});


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
