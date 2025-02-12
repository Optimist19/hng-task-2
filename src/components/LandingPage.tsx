import { useState } from "react";
import { Button } from "./ui/button";
import NavBar from "./NavBar";
import bgImg from "../assets/Attendee Details.jpg";
import lightBgImg from "../assets/lightBgImg.png";
import message from "../assets/message.svg";
import cloud from "../assets/icon.svg";
import card from "../assets/Group 1.svg";
import ProgressBar from "./ProgressBar";
import { Inputs, Inputs2, ticket, TicketType } from "@/data";

import { useForm, SubmitHandler } from "react-hook-form";

interface UploadedImageResponse {
  url: string;
}

interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

function LandingPage() {
  const [imgUrl, setImgURL] = useState(""); //Get the data
  const [isLoading, setIsLoading] = useState(false);

  // step1 Input
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  // step2 Input
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 }
  } = useForm<Inputs2>();

  const [closeLandingPage, setCloseLandingPage] = useState(true);

  const [progressCount, setProgressCount] = useState(0);
  const [stepCount, setStepCount] = useState(1);

  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showNavBar] = useState(true);
  const [ticketSelected, setTicketSelected] = useState<TicketType>({
    access: "",
    remains: "",
    amount: ""
  }); //Get the data
  const [noTicket, setNoTicket] = useState<number>(); // Get the data
  const [name, setName] = useState(""); // Get the data
  const [email, setEmail] = useState(""); // Get the data
  const [specialInput, setSpecialInput] = useState(""); // Get the data
  const [noTicketSelectedErroMessage, setNoTicketSelectedErroMessage] =
    useState(false);

  // const [goToStepTwo, setGoToStepTwo] = useState(true);

  // const [goToStepThree, setGoToStepThree] = useState(true);

  console.log(ticketSelected, " ticketSelected");
  const onSubmitStepOne: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setNoTicket(Number(data.optionSelected));

    if (Object.keys(ticketSelected).length === 0) {
      setNoTicketSelectedErroMessage(true);
      return;
    }

    setStepCount((prev) => {
      return (prev = prev + 1);
    });

    setProgressCount((prev) => {
      return (prev = prev + 50);
    });
    goToStepTwoFtn();
  };

  const onSubmitStepTwo: SubmitHandler<Inputs2> = (data) => {
    console.log(data);
    setName(data.name);
    setEmail(data.email);
    setSpecialInput(data?.special || "Nil");

    setStepCount((prev) => {
      return (prev = prev + 1);
    });

    setProgressCount((prev) => {
      return (prev = prev + 50);
    });

    goToStepThreeFtn();
  };

  function landingPageFtn() {
    setCloseLandingPage(false);
    setStepOne(true);
    setShowSteps(true);
  }

  function goToStepTwoFtn() {
    setStepOne(false);
    setStepTwo(true);
  }

  function ticketCollectionFtn(tick: TicketType) {
    // console.log(tick)
    setTicketSelected(tick);
  }

  function goToStepThreeFtn() {
    setStepTwo(false);

    setStepThree(true);
  }

  const handleFileUpload = async (event: FileUploadEvent): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time_using_cloudinary");
    data.append("cloud_name", "dsyq2mclc");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsyq2mclc/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const uploadedImageURL: UploadedImageResponse = await res.json();

    setIsLoading(false);
    setImgURL(uploadedImageURL.url);
  };

  const greenBg = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  console.log(stepThree, "stepThree");

  const lightbgImg = {
    width: "100%",
    backgroundImage: `url(${lightBgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const ticketBg = {
    backgroundImage: `url(${card})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "70%",
    // height:"40vh"
    padding: "30px"
  };

  return (
    <>
      {closeLandingPage && (
        <div className="h-screen bg-blue-400">
          <div className="  text-white flex flex-col justify-center items-center md:pl-[10vw] md:pt-[10vh] md:block">
            <p className="text-[32px] md:text-[55px]">Ticketing Booking App</p>
            <p className="text-[42px] md:text-[132px] tracking-[0.3vw] font-pochaevsk md:leading-[22vh] font-thin">
              Dev Practice
            </p>
            <p className="text-[42px] md:text-[132px] tracking-[0.3vw] font-pochaevsk md:leading-[22vh] font-thin">
              Designs File
            </p>
            <div>
              <Button onClick={landingPageFtn}>Get Started</Button>
            </div>
          </div>
        </div>
      )}

      {showSteps && (
        <div className="" style={greenBg}>
          {showNavBar && <NavBar />}

          {/* step 1 */}
          {stepOne && (
            <form onSubmit={handleSubmit(onSubmitStepOne)}>
              <div className="flex justify-center pt-6">
                <div className="w-[700px] bg-[#041E23] rounded-2xl px-8 py-2 ring-[#0E464F] ring-1">
                  <div className="py-5">
                    <div className="text-white flex items-center justify-between">
                      <p className="font-extralight text-[22px]">
                        Ticket Selecion
                      </p>
                      <p className="text-[10px] font-roboto">
                        Step {stepCount}/3
                      </p>
                    </div>
                    <div className="py-2">
                      <ProgressBar value={progressCount} />
                    </div>
                  </div>

                  <div className="bg-[#08252B] px-5 text-white rounded-2xl ring-1 ring-[#0E464F] py-5 overflow-y-scroll h-[65vh]">
                    {/* Techember Fest ”25 */}
                    <div
                      style={lightbgImg}
                      className="flex flex-col items-center rounded-2xl px-3 ring-1 ring-[#0E464F]">
                      <p className="text-[42px] font-roadRage">
                        Techember Fest &Prime;25
                      </p>
                      <p className="text-[14px] md:w-[40%] text-center font-roboto">
                        Join us for an unforgettable experience at &#x5b;Event
                        Name&#93;&#33; Secure your spot now.
                      </p>
                      <div className="flex items-center py-2 text-[14px] font-roboto">
                        <span>📍</span>
                        <p>
                          &#x5b;Event Location&#93;{" "}
                          <span className="px-2">||</span> March 15, 2025 | 7:00
                          PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 py-5">
                      <div
                        className={`flex-1 h-1 rounded-full bg-[#0E464F] overflow-hidden`}></div>
                    </div>

                    {/* Select Ticket Type: */}
                    <div className="font-roboto py-3">
                      <p>Select Ticket Type:</p>
                      <div className="py">
                        <div className="grid grid-cols-2 gap-3 px-3 py-3 ring-1 ring-[#0E464F] rounded-2xl">
                          {ticket.map((tic, i) => {
                            return (
                              <div
                                onClick={() => ticketCollectionFtn(tic)}
                                key={i}
                                className={` rounded-lg p-4 mb-2 hover:bg-[#2BA4B9] grid  grid-cols-[65%_35%] ring-1 ring-[#0E464F] cursor-pointer`}>
                                <div>
                                  <div>
                                    <p className="uppercase">{tic.access}</p>
                                    <p className="text-[14px]">{tic.remains}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="bg-[#0E464F] text-[20px] font-semibold text-right pr-1 rounded-md">
                                    {tic.amount}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {noTicketSelectedErroMessage && (
                          <p className="text-[9px] text-red-700 pt-[2px]">
                            Please, select a ticket
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Number of Tickets */}
                    <div className="py-3">
                      <p className="py-2">Number of Tickets</p>

                      <select
                        className="w-full bg-[hsl(190,69%,10%)] ring-1 ring-[#0E464F] py-1 rounded-md pl-1"
                        {...register("optionSelected", {
                          required: {
                            value: true,
                            message: "Please, select no ticket(s)"
                          }
                        })}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      <p className="text-[9px] text-red-700 pt-[2px]">
                        {errors.optionSelected?.message}
                      </p>
                    </div>

                    {/* cancel and next btn */}
                    <div>
                      <div className="w-full flex items-center justify-between bg-[#041E23] rounded-full ring-1 ring-[#0E464F] px-[5vw]">
                        <div>
                          <Button className="px-[6vw] bg-[#041E23] ring-1 ring-[#0E464F] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white">
                            Cancel
                          </Button>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            className="px-[6vw] bg-[#041E23] ring-1 ring-[#0E464F] hover:bg-[#24A0B5] text-white">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* step 2 */}
          {stepTwo && (
            <div>
              <form onSubmit={handleSubmit2(onSubmitStepTwo)}>
                <div className="flex justify-center pt-6">
                  <div className="w-[700px] bg-[#041E23] rounded-2xl px-8 py-2 ring-[#0E464F] ring-1">
                    <div className="py-5">
                      <div className="text-white flex items-center justify-between">
                        <p className="font-extralight text-[22px]">
                          Attendee Details
                        </p>
                        <p className="text-[10px] font-roboto">
                          Step {stepCount}/3
                        </p>
                      </div>
                      <div className="py-2">
                        <ProgressBar value={progressCount} />
                      </div>
                    </div>

                    <div className="bg-[#08252B] px-5 text-white rounded-2xl ring-1 ring-[#0E464F] py-5 overflow-y-scroll h-[65vh]">
                      {/* Profile Pic */}
                      <div className=" rounded-2xl px-3 ring-1 ring-[#0E464F] bg-[#07373F] py-4">
                        <p className="py-4">Upload Profile Photo</p>

                        <div className="bg-[#041E23] h-[30vh] flex justify-center ">
                          <div className="w-[240px] h-[30vh] bg-[#0E464F] text-[#FAFAFA] rounded-3xl">
                            <div className="flex flex-col items-center justify-center h-[100%] gap-3">
                              <div>
                                {isLoading ? (
                                  "Uploading..."
                                ) : imgUrl ? (
                                  <div className="rounded-2xl">
                                    <img src={imgUrl} alt="Uploaded" />
                                  </div>
                                ) : (
                                  <div>
                                    <div className="flex justify-center py-2">
                                      <img src={cloud} alt="upload" />
                                    </div>
                                    <p className="text-center">
                                      Drag & drop or click to <br />
                                      upload
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="">
                                <input
                                  type="file"
                                  onChange={handleFileUpload}
                                  className="file-input"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-4 py-5">
                        <div
                          className={`flex-1 h-1 rounded-full bg-[#0E464F] overflow-hidden`}></div>
                      </div>

                      {/* Enter name */}
                      <div className="py-3">
                        <p className="py-2">Enter your name</p>
                        <input
                          {...register2("name", {
                            required: {
                              value: true,
                              message: "Provide your name"
                            }
                          })}
                          type="text"
                          className="w-full bg-[hsl(190,69%,10%)] ring-1 ring-[#0E464F] py-1 rounded-md pl-1"
                        />
                        <span className="text-[9px] text-red-700 pt-[2px]">
                          {errors2.name?.message}
                        </span>
                      </div>

                      {/* Enter email */}
                      <div className="py-3">
                        <p className="py-2">Enter your email *</p>
                        <div className="flex items-center ring-1 ring-[#0E464F] rounded-md px-2">
                          <div>
                            <img src={message} alt="message-icon" />
                          </div>
                          <input
                            className="w-full bg-[hsl(190,69%,10%)] border-0 outline-none py-1 rounded-md pl-2"
                            placeholder="hello@avioflagos.io"
                            type="email"
                            id="email"
                            {...register2("email", {
                              required: "Please provide your email",
                              validate: (value) => {
                                if (!value.includes("@")) {
                                  return "Email must include @";
                                }
                                return true;
                              },
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format"
                              }
                            })}
                          />
                        </div>
                      </div>
                      {errors2.email && (
                        <span className="text-[9px] text-red-700 pt-[2px]">
                          {errors2.email.message}
                        </span>
                      )}

                      {/* About the project */}
                      <div className="py-3">
                        <p className="py-2">Special request? </p>
                        <textarea
                          {...register2("special")}
                          id="special"
                          name="special"
                          rows={4}
                          cols={50}
                          placeholder="Textarea"
                          className="w-full bg-[hsl(190,69%,10%)] ring-1 ring-[#0E464F] py-1 rounded-md pl-2"></textarea>
                      </div>

                      {/* cancel and next btn */}
                      <div className="flex justify-between items-center">
                        <div>
                          <Button className="px-[9vw] bg-[#041E23] ring-1 ring-[#0E464F] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white">
                            Cancel
                          </Button>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            className="px-[9vw] bg-[#041E23] ring-1 ring-[#0E464F] hover:bg-[#24A0B5] text-white">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* step 3 */}
          {stepThree && (
            <div>
              <div className="flex justify-center pt-6">
                <div className="w-[700px] bg-[#041E23] rounded-2xl px-8 py-2 ring-[#0E464F] ring-1">
                  <div className="py-5">
                    <div className="text-white flex items-center justify-between">
                      <p className="font-extralight text-[22px]">Ready</p>
                      <p className="text-[10px] font-roboto">
                        Step {stepCount}/3
                      </p>
                    </div>
                    <div className="py-2">
                      <ProgressBar value={progressCount} />
                    </div>
                  </div>

                  <div className=" px-5 text-white rounded-2xl py-5 h-[65vh]">
                    <div className="flex justify-center ">
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-[32px]">Your Ticket is Booked!</p>
                        <p className="">
                          Check your email for a copy or you can download
                        </p>
                      </div>
                    </div>
                    <div className="h-[40vh] overflow-y-scroll w-full ">
                      <div className="h-[120vh] flex justify-center">
                        <div
                          style={{ ...ticketBg }}
                          className="h-full w-[90%] max-w-[700px] mx-auto mt-[2vh]">
                          <div className="bg-[#08252B] text-white rounded-2xl ring-1 ring-[#24A0B5] py-5">
                            {/* Techember Fest ”25 */}
                            <div className="grid rounded-2xl px-4">
                              <div className="flex justify-center">
                                <div className="pb-3">
                                  <p className="text-[34px] font-roadRage">
                                    Techember Fest &Prime;25
                                  </p>

                                  <div className="py-2 text-[15px] font-roboto grid gap-3">
                                    <p>📍 04 Rumes road, Ikoyi, Lagos</p>
                                    <p>📅 March 15, 2025 | 7:00 PM</p>
                                  </div>

                                  <div className="py-5">
                                    <div className="h-[140px] w-[140px]">
                                      <img
                                        src={imgUrl}
                                        alt=""
                                        className="w-[100%]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="ring-1 ring-[#12464E] rounded-2xl py-3">
                                <div>
                                  <div className="px-3 ">
                                    <div className="grid grid-cols-2 ">
                                      <div className=" border-r-[0.5px] border-b-[0.5px] grid gap-1">
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
                                      <div className="border-r-[0.5px] border-b-2  border-t-[0.5px] grid gap-1">
                                        <p className="font-roboto text-[10px] py-1">
                                          Ticket type
                                        </p>
                                        <p className="font-roboto text-[12px] font-bold py-1">
                                          {ticketSelected.access.split(" ")[0]}
                                        </p>
                                      </div>
                                      <div className="border-l-[0.5px] border-t-[0.5px] border-b-2  pl-3 grid gap-1">
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
                        </div>
                      </div>
                    </div>

                    {/* cancel and next btn */}
                    <div className=" py-4">
                      <div className="w-full flex items-center gap-4  bg-[#041E23] rounded-full ring-1 ring-[#0E464F] px-[5vw]">
                        <div>
                          <Button className="px-[4vw] bg-[#041E23] ring-1 ring-[#0E464F] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white">
                            Book Another Ticket
                          </Button>
                        </div>
                        <div>
                          <Button className="px-[4vw] bg-[#041E23] ring-1 ring-[#0E464F] hover:bg-[#24A0B5] text-white">
                            Download Ticket
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LandingPage;
