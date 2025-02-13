import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import cloud from "../assets/icon.svg";
import message from "../assets/message.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import ProgressBar from "./ProgressBar";
import {
  FileUploadEvent,
  Inputs2,
  StepTwoTypes,
  UploadedImageResponse
} from "@/types";

function StepTwoComp(props: StepTwoTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setName,
    setEmail,
    setSpecialInput,
    setStepCount,
    setProgressCount,
    goToStepThreeFtn,
    stepCount,
    progressCount,
    imgUrl,
    setImgURL,
    cancelBtnFtn,
    ticketSelected,
    name,
    email,
    specialInput
  } = props;

  const {
    setValue,
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 }
  } = useForm<Inputs2>();

  useEffect(() => {
    const savedData = localStorage.getItem("barcode");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setValue("name", parsedData.name || "");
      setValue("email", parsedData.email || "");
      setValue("special", parsedData.email || "");
    }
  }, [setValue]);

  const onSubmitStepTwo: SubmitHandler<Inputs2> = (data) => {
    localStorage.setItem(
      "barcode",
      JSON.stringify({ ...data, imgUrl, name, email, specialInput })
    );
    // console.log(data,"datata")
    // console.log(ticketSelected,"ticketSelected")
    console.log(data);
    setName(data.name);
    setEmail(data.email);
    setSpecialInput(data?.special || "Nil");

    setStepCount(stepCount + 1);

    setProgressCount(progressCount + 50);

    goToStepThreeFtn();
  };

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

  return (
    <div>
      <form onSubmit={handleSubmit2(onSubmitStepTwo)}>
        <div className="flex justify-center pt-6">
          <div className="w-[604px] bg-[#041E23] rounded-2xl px-8 py-2 ring-[#0E464F] ring-1">
            <div className="py-5">
              <div className="text-white flex items-center justify-between">
                <p className="font-extralight text-[22px]">Attendee Details</p>
                <p className="text-[10px] font-roboto">Step {stepCount}/3</p>
              </div>
              <div className="py-2">
                <ProgressBar value={progressCount} />
              </div>
            </div>

            <div className="bg-[#08252B] px-5 text-white rounded-2xl ring-1 ring-[#0E464F] py-5 overflow-y-scroll h-[65vh]">
              {/* Profile Pic */}
              <div className=" rounded-2xl px-3 ring-1 ring-[#0E464F] bg-[#07373F] py-4">
                <p className="py-4">Upload Profile Photo</p>

                <div className="md:bg-[#041E23] h-[30vh] flex justify-center ">
                  <div className="w-[240px] h-[30vh] bg-[#0E464F] text-[#FAFAFA] rounded-3xl">
                    <div className="flex flex-col items-center justify-center h-[100%] gap-3 relative">
                      <label htmlFor="input">
                      <div>
                        {isLoading ? (
                          "Uploading..."
                        ) : imgUrl ? (
                          <div className="rounded-2xl w-[12vw]">
                            <img src={imgUrl} alt="Uploaded" className="w-[100%] rounded-2xl"/>
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
                      </label>
                      <div className="absolute bottom-5 left-5">
                        <input id="input"
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
                <label htmlFor="name" className="">
                  Enter your name
                </label>
                <input
                  id="name"
                  {...register2("name", {
                    required: {
                      value: true,
                      message: "Provide your name"
                    }
                  })}
                  type="text"
                  className="w-full bg-[hsl(190,69%,10%)] ring-1 ring-[#0E464F] py-1 rounded-md pl-1 my-1"
                />
                <span className="text-[9px] text-red-700 pt-[2px]">
                  {errors2.name?.message}
                </span>
              </div>

              {/* Enter email */}
              <div className="py-3">
                <label htmlFor="email" className="">
                  Enter your email *
                </label>
                <div className="flex items-center ring-1 ring-[#0E464F] rounded-md px-2 py-1 my-1">
                  <div className="pr-2">
                    <img src={message} alt="message-icon" />
                  </div>
                  <input
                    id="email"
                    className="w-full bg-[hsl(190,69%,10%)] border-0 outline-none py-1 rounded-md pl-2"
                    placeholder="hello@avioflagos.io"
                    type="email"
                    {...register2("email", {
                      required: "Please provide your email",
                      validate: (value) => {
                        if (!value.includes("@")) {
                          return "Email must include @";
                        }
                        return true;
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                <label className="py-2">Special request? </label>
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
              <div className="w-full  flex flex-col gap-3 md:gap-3  md:flex-row md:items-center md:justify-between rounded-full flex-col-reverse">
                <Button
                  className="md:w-[290px] bg-[#041E23] ring-1 ring-[#24A0B5] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white"
                  onClick={cancelBtnFtn}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="md:w-[290px] bg-[#041E23] ring-1 ring-[#24A0B5] hover:bg-[#24A0B5] text-white">
                  {ticketSelected.amount === "Free"
                    ? "Get My Free Ticket"
                    : "Get My Ticket"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StepTwoComp;
