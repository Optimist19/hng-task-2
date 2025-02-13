import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import NavBar from "./NavBar";
import bgImg from "../assets/Attendee Details.jpg";
import StepOneComp from "./StepOneComp";
import StepTwoComp from "./StepTwoComp";
import StepThreeComp from "./StepThreeComp";
import { Inputs, TicketType } from "@/types";
import { useForm } from "react-hook-form";

function LandingPage() {
  const { setValue } = useForm<Inputs>();
  const [imgUrl, setImgURL] = useState("");
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
  });
  const [noTicket, setNoTicket] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialInput, setSpecialInput] = useState("");

  useEffect(() => {
    // const storedData = localStorage.getItem("myData");
    if (stepOne === true) {
      setProgressCount(0);
      setStepCount(1);
    }

    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);

    //   // ✅ Populate form fields
    //   setValue("optionSelected", parsedData.noTicket.toString());
    // }
  }, [stepOne, setValue, setNoTicket]); // Only re-run effect when stepOne changes

  function getStartedBtnFtn() {
    setCloseLandingPage(false);
    setStepOne(true);
    setShowSteps(true);
  }

  function goToStepTwoFtn() {
    setStepOne(false);
    setStepTwo(true);

    // localStorage.setItem(
    //   "myData",
    //   JSON.stringify({
    //     access: ticketSelected.access,
    //     noTicket: noTicket
    //   })
    // );
  }

  function ticketCollectionFtn(tick: TicketType) {
    setTicketSelected(tick);
  }

  function goToStepThreeFtn() {
    setStepTwo(false);
    setStepThree(true);
  }

  const greenBg = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  function backToStepOne() {
    setStepOne(true);
    setStepThree(false);
    setStepTwo(false);
    localStorage.removeItem("barcode");
  }

  function cancelBtnFtn() {
    setCloseLandingPage(true);
    setShowSteps(false);
    setStepTwo(false);
  }

  return (
    <>
      {closeLandingPage && (
        <div className="bg-blue-400 h-[100vh] text-white flex flex-col justify-center items-center md:pl-[10vw] md:pt-[10vh] md:block">
          <p className="text-[32px] md:text-[55px]">Ticketing Booking App</p>
          <p className="text-[42px] md:text-[132px] tracking-[0.3vw] font-pochaevsk md:leading-[22vh] font-thin">
            Dev Practice
          </p>
          <p className="text-[42px] md:text-[132px] tracking-[0.3vw] font-pochaevsk md:leading-[22vh] font-thin">
            Designs File
          </p>
          <div>
            <Button onClick={getStartedBtnFtn}>Get Started</Button>
          </div>
        </div>
      )}

      {showSteps && (
        <div className="px-3 w-[700px]" style={greenBg}>
          {showNavBar && <NavBar />}

          {/* step 1 */}
          {stepOne && (
            <StepOneComp
              goToStepTwoFtn={goToStepTwoFtn}
              setNoTicket={setNoTicket}
              stepCount={stepCount}
              setStepCount={setStepCount}
              setProgressCount={setProgressCount}
              progressCount={progressCount}
              ticketCollectionFtn={ticketCollectionFtn}
              ticketSelected={ticketSelected}
              cancelBtnFtn={cancelBtnFtn}
            />
          )}

          {/* step 2 */}
          {stepTwo && (
            <StepTwoComp
              setName={setName}
              setEmail={setEmail}
              setSpecialInput={setSpecialInput}
              setStepCount={setStepCount}
              setProgressCount={setProgressCount}
              goToStepThreeFtn={goToStepThreeFtn}
              stepCount={stepCount}
              progressCount={progressCount}
              imgUrl={imgUrl}
              setImgURL={setImgURL}
              cancelBtnFtn={cancelBtnFtn}
              ticketSelected={ticketSelected}
              name={name}
              email={email}
              specialInput={specialInput}
            />
          )}

          {/* step 3 */}
          {stepThree && (
            <StepThreeComp
              stepCount={stepCount}
              progressCount={progressCount}
              imgUrl={imgUrl}
              name={name}
              email={email}
              ticketSelected={ticketSelected}
              noTicket={noTicket}
              specialInput={specialInput}
              backToStepOne={backToStepOne}
            />
          )}
        </div>
      )}
    </>
  );
}

export default LandingPage;
