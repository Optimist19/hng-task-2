import logo from "../assets/Frame 1618871078.svg";
import arrow from "../assets/Line 5.svg";

function NavBar() {
  return (
    <nav className="  pt-3">
      <header className="bg-[#05252C] flex  items-center justify-between  border border-[#0E464F] py-[2vh] rounded-3xl px-[16px]">
        <div
          className="cursor-pointer
">
          <img src={logo} alt="company-logo" />
        </div>
        <ul className="font-extralight text-[13px] hidden md:flex md:items-center md:gap-6 md:block ">
          <li className="text-[#B3B3B3] hover:text-[#FFFFFF] cursor-pointer ">
            Events
          </li>

          <li className=" cursor-pointer hover:text-[#FFFfFF] text-[#B3B3B3]">
            My Tickets
          </li>
          <li className=" cursor-pointer hover:text-[#FFfFFF] text-[#B3B3B3]">
            About Project
          </li>
        </ul>
        <div className="flex gap-1 items-center text-black bg-white py-2 px-3 rounded-md text-[13px] cursor-pointer">
          <span>MY TICKETS</span>
          <div className="">
            <img src={arrow} alt="company-logo" />
          </div>
        </div>
      </header>
    </nav>
  );
}

export default NavBar;
