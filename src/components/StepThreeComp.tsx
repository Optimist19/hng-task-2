import { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { Button } from "./ui/button";
import ProgressBar from "./ProgressBar";
import { StepThreeTypes } from "@/types";
import card from "../assets/bg.png";
import html2canvas from "html2canvas";

function StepThreeComp(props: StepThreeTypes) {
  const {
    stepCount,
    progressCount,
    imgUrl,
    name,
    email,
    ticketSelected,
    noTicket,
    specialInput,
    backToStepOne
  } = props;

  // Create a ref for the barcode SVG
  const barcodeRef = useRef(null);
  const generateRandomNumbers = () => {
    let randomNumbers = "";
    for (let i = 0; i < 12; i++) {
      const randomNumber = Math.floor(Math.random() * 100); // Random number between 0 and 99
      randomNumbers += randomNumber + " ";
    }
    return randomNumbers;
  };

  // Initialize the barcode when the component mounts
  useEffect(() => {
    const randomNumbers = generateRandomNumbers();

    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, randomNumbers, {
        format: "CODE128",
        displayValue: true
      });
    }
  }, []);

  const handleDownload = () => {
    const container = document.getElementById("barcode-container");
    if (container) {
      html2canvas(container).then((canvas) => {
        const link = document.createElement("a");
        link.download = "barcode_and_image.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const ticketBg = {
    backgroundImage: `url(${card})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "70%",
    padding: "30px"
  };

  return (
    <div>
      <div className=" py-[7vh]">
        <div className="flex justify-center ">
          <div className="relative w-[600px] bg-[#041E23] flex items-center flex-col ring-1 ring-[#07373F] rounded-2xl">
            <div className="w-[100%]">
              {/* 1 */}
              <div className="py-5 px-[5vw]">
                <div className="text-white flex items-center justify-between">
                  <p className="font-extralight text-[22px]">Ready</p>
                  <p className="text-[10px] font-roboto">Step {stepCount}/3</p>
                </div>
                <div className="py-2">
                  <ProgressBar value={progressCount} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-white pb-[6vh]">
                <p className="text-[32px]">Your Ticket is Booked!</p>
                <p className="py-2 text-center">
                  Check your email for a copy or you can download
                </p>
              </div>

              <div className="h-[30vh] overflow-y-scroll flex justify-center">
                <div className="w-[300px] h-[750px] bg-custom relative ">
                  <div className="w-[100%] h-[100px] bg-up-custom-light-green">
                    <div className="h-[100%] grid gap-[14vh] px-3 ">
                      <div className="pt-[7vh] flex flex-col items-center text-white">
                        <p className="text-[34px] font-roadRage">
                          Techember Fest &Prime;25
                        </p>

                        <div className="py-2 text-[15px] font-roboto grid gap-3">
                          <p>📍 04 Rumes road, Ikoyi, Lagos</p>
                          <p>📅 March 15, 2025 | 7:00 PM</p>
                        </div>

                        <div className="">
                          <div className="h-[140px] w-[140px]">
                            <img
                              // src={imgUrl}
                              src="https://igimage.indiaglitz.com/telugu/gallery/actor/rahulvijay/poster.jpg"
                              alt=""
                              className="w-[100%] rounded-2xl ring-2 ring-[#24A0B5]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ring-1 ring-[#12464E] rounded-2xl py-3">
                        <div>
                          <div className="px-3">
                            <div className="grid grid-cols-2">
                              <div className="border-r-[0.5px] border-b-[0.5px] grid gap-1">
                                <p className="font-roboto text-[10px] py-1">
                                  Enter your name
                                </p>
                                <p className="font-roboto text-[12px] font-bold py-1">
                                  {name}
                                </p>
                              </div>
                              <div className="border-l-[0.5px] border-b-[0.5px] pl-3 grid gap-1">
                                <p className="font-roboto text-[10px] py-1">
                                  Enter your email*
                                </p>
                                <div className="overflow-y-hidden">
                                  <p className="font-roboto text-[12px] font-bold py-1">
                                    {email}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="border-r-[0.5px] border-b-2 border-t-[0.5px] grid gap-1">
                                <p className="font-roboto text-[10px] py-1">
                                  Ticket type
                                </p>
                                <p className="font-roboto text-[12px] font-bold py-1">
                                  {ticketSelected.access.split(" ")[0]}
                                </p>
                              </div>
                              <div className="border-l-[0.5px] border-t-[0.5px] border-b-2 pl-3 grid gap-1">
                                <p className="font-roboto text-[10px] py-1">
                                  Ticket for:
                                </p>
                                <p className="font-roboto text-[10px] font-bold py-1">
                                  {noTicket}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="pl-3 pt-3 font-roboto text-[10px] grid gap-2">
                            <p>Special request?</p>
                            <p>{specialInput}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] h-[100px] bg-down-custom-light-green  absolute bottom-0"></div>

                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] top-[-4vh]"></div>
                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] top-[-4vh]"></div>
                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] bottom-[-4vh] z-10"></div>
                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] bottom-[-4vh] z-10"></div>
                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] bottom-[14vh] z-20"></div>
                  <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] bottom-[14vh] z-20"></div>
                  <div className="bg-red-100 custom-dash z-10 absolute left-0 right-0 bottom-[17vh]"></div>

                  {/* <div className=" rounded-2xl px-4 "> */}
                  {/* <div className="h-[100%]">
                  <div className="pb-3">
                    <p className="text-[34px] font-roadRage">
                      Techember Fest &Prime;25
                    </p>

                    <div className="py-2 text-[15px] font-roboto grid gap-3">
                      <p>📍 04 Rumes road, Ikoyi, Lagos</p>
                      <p>📅 March 15, 2025 | 7:00 PM</p>
                    </div>

                    <div className="">
                      <div className="h-[140px] w-[140px]">
                        <img
                          // src={imgUrl}
                          src="https://igimage.indiaglitz.com/telugu/gallery/actor/rahulvijay/poster.jpg"
                          alt=""
                          className="w-[100%] rounded-2xl ring-2 ring-[#24A0B5]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ring-1 ring-[#12464E] rounded-2xl py-3">
                    <div>
                      <div className="px-3">
                        <div className="grid grid-cols-2">
                          <div className="border-r-[0.5px] border-b-[0.5px] grid gap-1">
                            <p className="font-roboto text-[10px] py-1">
                              Enter your name
                            </p>
                            <p className="font-roboto text-[12px] font-bold py-1">
                              {name}
                            </p>
                          </div>
                          <div className="border-l-[0.5px] border-b-[0.5px] pl-3 grid gap-1">
                            <p className="font-roboto text-[10px] py-1">
                              Enter your email*
                            </p>
                            <p className="font-roboto text-[12px] font-bold py-1">
                              {email}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="border-r-[0.5px] border-b-2 border-t-[0.5px] grid gap-1">
                            <p className="font-roboto text-[10px] py-1">
                              Ticket type
                            </p>
                            <p className="font-roboto text-[12px] font-bold py-1">
                              {ticketSelected.access.split(" ")[0]}
                            </p>
                          </div>
                          <div className="border-l-[0.5px] border-t-[0.5px] border-b-2 pl-3 grid gap-1">
                            <p className="font-roboto text-[10px] py-1">
                              Ticket for:
                            </p>
                            <p className="font-roboto text-[10px] font-bold py-1">
                              {noTicket}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="pl-3 pt-3 font-roboto text-[10px] grid gap-2">
                        <p>Special request?</p>
                        <p>{specialInput}</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            {/* Cancel and Next Buttons */}
            <div className="py-[4vh]">
              <div className="w-full flex items-center gap-4 px-[5vw]">
                <div>
                  <Button
                    className="px-[4vw] bg-[#041E23] ring-1 ring-[#0E464F] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white"
                    onClick={backToStepOne}>
                    Book Another Ticket
                  </Button>
                </div>
                <div>
                  <Button
                    className="px-[4vw] bg-[#041E23] ring-1 ring-[#0E464F] hover:bg-[#24A0B5] text-white"
                    onClick={handleDownload}>
                    Download Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepThreeComp;
