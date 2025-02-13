import React from "react";

function Frame() {
  return (
    <div className="bg-[#041E23] py-[7vh]">
      {/* <div className=" flex flex-col">
        <div className="ticket">
          <div className="ticket--start">
            <img src="https://i.ibb.co/W3cK42J/image-1.png" />
          </div>
          <div className="ticket--center">
            <div className="ticket--center--row">
              <div className="ticket--center--col">
                <span>Your ticket for</span>
                <strong>The event name</strong>
              </div>
            </div>
            <div className="ticket--center--row">
              <div className="ticket--center--col">
                <span className="ticket--info--title">Date and time</span>
                <span className="ticket--info--subtitle">
                  Thursday, May 14 2020
                </span>
                <span className="ticket--info--content">
                  7:00 am to 9:00 pm (GMT+1)
                </span>
              </div>
              <div className="ticket--center--col">
                <span className="ticket--info--title">Location</span>
                <span className="ticket--info--subtitle">Location name</span>
                <span className="ticket--info--content">
                  Location complete address, Town, COUNTRY
                </span>
              </div>
            </div>
            <div className="ticket--center--row">
              <div className="ticket--center--col">
                <span className="ticket--info--title">Ticket type</span>
                <span className="ticket--info--content">Event category</span>
              </div>
              <div className="ticket--center--col">
                <span className="ticket--info--title">Order info</span>
                <span className="ticket--info--content">
                  Order #0123456789. Ordered By Jhon DOE
                </span>
              </div>
            </div>
          </div>
          <div className="ticket--end">
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png" />
            </div>
            <div>
              <img src="https://qidoon.com/assets/img/logo.svg" />
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex justify-center ">
        <div className="relative w-[700px]  flex items-center flex-col">
          <div>

			<p>hello</p>
            <div className="w-[300px] h-[600px] bg-custom relative">
              <div className="w-[100%] h-[100px] bg-up-custom-light-green"></div>
              <div className="w-[100%] h-[100px] bg-down-custom-light-green  absolute bottom-0"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] top-[-4vh]"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] top-[-4vh]"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] bottom-[-4vh] z-10"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] bottom-[-4vh] z-10"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute left-[-2vw] bottom-[14vh] z-20"></div>
              <div className="bg-[#041E23] h-[50px] w-[50px] rounded-full absolute right-[-2vw] bottom-[14vh] z-20"></div>
              <div className="bg-red-100 custom-dash z-10 absolute left-0 right-0 bottom-[17vh]" ></div>



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frame;
