import React from "react";
import Header from "../components/Header_temp";
import Footer from "../components/Footer";
import BarcodeScanner from "../components/BarcodeScanner";

function BarcodeScannerPage() {
  return (
    <div>
      <Header />
      <main>
        <h1>Scanner un code-barres</h1>
        <BarcodeScanner />
      </main>
      <Footer />
    </div>
  );
}

export default BarcodeScannerPage;
