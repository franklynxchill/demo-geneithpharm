import { FiAward } from "react-icons/fi"
import Image from "next/image";
import manufacturing from "@/public/uploads/Pharmaceutical-manufacturing.jpg";


const Manufacturing = () => {
  return (
    <div className=" py-16 px-7 md:px-0  max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-7 items-center">
        <div className=" flex-1">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
              <FiAward className="  text-2xl text-white"/>
            </div>
            <h2>LOCAL MANUFACTURING</h2>
          </div>
          <p>
            Plans are ongoing to manufacture some of our brands, which are quality household medicines locally in our WHO-approved factory which is under construction in Mowe, Ogun State.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" bg-light-gray rounded-2xl p-5">
              <h4>WHO Standards</h4>
              <span className=" text-base mt-2">
                International quality manufacturing standards
              </span>
            </div>

            <div className=" bg-light-gray rounded-2xl p-5">
              <h4>Local Production</h4>
              <span className=" text-base mt-2">
                Reducing dependency on imports
              </span>
            </div>

            <div className=" bg-light-gray rounded-2xl p-5">
              <h4>Quality Control</h4>
              <span className=" text-base mt-2"> 
                Rigorous testing at every stage
              </span>
            </div>

            <div className=" bg-light-gray rounded-2xl p-5">
              <h4>Affordable Access</h4>
              <span className=" text-base mt-2">
                Making quality medicines accessible
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-light-gray p-7 mt-9">
            <h4 className=" mb-3">Manufacturing Excellence</h4>
            <span className=" text-base mt-2">
              Our upcoming manufacturing facility in Mowe, Ogun State will feature state-of-the-art equipment and processes that meet international WHO Good Manufacturing Practice (GMP) standards, ensuring every product meets the highest quality benchmarks.
            </span>
          </div>
        </div>
        <div className=" flex-1 relative">
          <Image
            src={manufacturing}
            alt="Pharmaceutical-manufacturing"
            width={580}
            height={600}
            className=" rounded-2xl"
          />
          <div className=" absolute left-4 bottom-3 w-[92%] md:w-[87%] shadow bg-white py-5 px-6">
            <h4 className=" font-bold mb-1">WHO-Approved Facility</h4>
            <p>
              Mowe, Ogun State • Under Construction
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manufacturing