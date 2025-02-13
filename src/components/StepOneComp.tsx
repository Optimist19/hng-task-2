import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import lightBgImg from "../assets/lightBgImg.png";
import { Button } from "./ui/button";
import { ticket } from "@/data";
import { Inputs, StepTwoFtnType } from "@/types";
import { ToastContainer, toast } from "react-toastify";

function StepOneComp(props: StepTwoFtnType) {
  const {
    goToStepTwoFtn,
    setNoTicket,
    stepCount,
    setStepCount,
    setProgressCount,
    progressCount,
    ticketCollectionFtn,
    ticketSelected,
    cancelBtnFtn
  } = props;

  const [noTicketSelectedErroMessage, setNoTicketSelectedErroMessage] =
    useState(false);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    const savedData = localStorage.getItem("barcode");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setValue("optionSelected", parsedData.name || "");
    }
  }, [setValue]);

  const onSubmitStepOne: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem(
      "barcode",
      JSON.stringify({ ...data, ...ticketSelected })
    );
    // console.log(data,"datata")

    console.log(data);
    setNoTicket(Number(data.optionSelected));

    console.log(ticketSelected, "ticketSelected");

    // if (Object.keys(ticketSelected).length === 0) {
    //   setNoTicketSelectedErroMessage(true);
    //   return;
    // }

    if (ticketSelected.access === "") {
      setNoTicketSelectedErroMessage(true);
      return;
    }

    setStepCount(stepCount + 1);
    setProgressCount(progressCount + 50);
    goToStepTwoFtn();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitStepOne)}
        aria-labelledby="form-title">
        <div className="flex justify-center pt-6">
          <div
            className="w-[604px] bg-[#041E23] rounded-2xl px-8 py-2 ring-[#0E464F] ring-1"
            role="region"
            aria-labelledby="form-title">
            <div className="py-5">
              <div className="text-white flex items-center justify-between">
                <h1 id="form-title" className="font-extralight text-[22px]">
                  Ticket Selection
                </h1>
                <p className="text-[10px] font-roboto" aria-live="polite">
                  Step {stepCount}/3
                </p>
              </div>
              <div className="py-2">
                <ProgressBar
                  value={progressCount}
                  aria-label="Progress indicator"
                />
              </div>
            </div>

            <div
              className="bg-[#08252B] px-5 text-white rounded-2xl ring-1 ring-[#0E464F] py-5 overflow-y-scroll h-[65vh]"
              role="region"
              aria-labelledby="ticket-selection">
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${lightBgImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                className="flex flex-col items-center rounded-2xl px-3 ring-1 ring-[#0E464F]"
                aria-labelledby="event-title">
                <h2
                  id="event-title"
                  className="text-[42px] font-roadRage text-center">
                  Techember Fest &Prime;25
                </h2>
                <p className="text-[14px] md:w-[40%] text-center font-roboto">
                  Join us for an unforgettable experience at &#x5b;Event
                  Name&#93;! Secure your spot now.
                </p>
                <p className="py-2 text-[14px] font-roboto text-center">
                  📍 &#x5b;Event Location&#93; <span className="px-2">||</span>{" "}
                  March 15, 2025 | 7:00 PM
                </p>
              </div>

              {/* Select Ticket Type */}
              <div className="font-roboto pt-1">
                <label htmlFor="ticketType">Select Ticket Type:</label>
                <div className="grid gap-3 md:grid-cols-3 px-3 py-3 mt-1 ring-1 ring-[#0E464F] rounded-2xl">
                  {ticket.map((tic, i) => (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        ticketCollectionFtn(tic);
                        toast("selected", {
                          position: "bottom-left",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark"
                        });
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && ticketCollectionFtn(tic)
                      }
                      className=" rounded-lg p-4 mb-2 hover:bg-[#2BA4B9] ring-1 ring-[#24A0B5] cursor-pointer"
                      aria-label={`Ticket Type: ${tic.access}, Remaining: ${tic.remains}, Price: ${tic.amount}`}>
                      <div className="py-1">
                        <p className=" text-[20px] font-semibold">
                          {tic.amount}
                        </p>
                      </div>
                      <div className="">
                        <p className="uppercase">{tic.access}</p>
                        <p className="text-[14px]">{tic.remains}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {noTicketSelectedErroMessage && (
                  <p className="text-[9px] text-red-700 pt-[2px]" role="alert">
                    Please, select a ticket
                  </p>
                )}
              </div>

              {/* Number of Tickets */}
              <div className="py-3">
                <label htmlFor="optionSelected">Number of Tickets</label>
                <select
                  id="optionSelected"
                  className="w-full bg-[hsl(190,69%,10%)] ring-1 ring-[#0E464F] py-1 mt-1 rounded-md pl-1"
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
                <p className="text-[9px] text-red-700 pt-[2px]" role="alert">
                  {errors.optionSelected?.message}
                </p>
              </div>

              {/* Buttons */}
              <div className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-full ">
                <Button
                  className="md:w-[290px] bg-[#041E23] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white ring-1 ring-[#24A0B5] order-1"
                  onClick={cancelBtnFtn}
                  aria-label="Cancel selection">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="md:w-[290px] bg-[#041E23]  ring-1 ring-[#24A0B5] hover:bg-[#24A0B5] text-white md:order-1"
                  aria-label="Proceed to next step">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default StepOneComp;
