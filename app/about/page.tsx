import Image from "next/image";
import { LuCalendar, LuHandshake, LuTarget } from "react-icons/lu";
import medicalAssociation from "@/public/uploads/Nigerian-Medical-Association-150x150.png";
import communityPharmacists from "@/public/uploads/Association-of-Community-Pharmacists-of-Nigeria-150x150.png";
import associationHospital from "@/public/uploads/National-Association-of-Hospital-and-Administrative-Pharmacists-of-Nigeria-150x150.png";
import videobanner from "@/public/uploads/videobanner.jpg";
import { FiAward, FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { PiBuildingOffice } from "react-icons/pi";



export default function page() {
  const leadership = [
    {
      name: 'UMENWA, E. Emmanuel',
      highlight: "Founder & CEO",
      position: 'Chief Executive Officer/ Managing Director',
      bio1: 'Mr. Emmanuel Umenwa is the MD/CEO of Geneith Pharmaceuticals Limited and serves on its board of directors. As the founder of Geneith, he has over two decades of experience leading the same.',
      bio2: 'An astute leader, brand builder, and merchandising champion, he is a member of the Institute of Directors (IOD) and a Rotarian. He has won several awards in and outside the Pharmaceutical Industry, which includes the Pillar of Pharmacy award from the Pharmaceutical Society of Nigeria, Lagos.',
      bio3: "A philanthropist and an innovator, he obtained his first degree in Business Administration and holds an MBA from the prestigious University of Lagos, and has remained an alumnus.",
      image: "/uploads/Chairman.png",
      bio4: "He also sits on the boards of several performance-driven organizations across Pharmaceuticals, hospitality, and telecommunications such as Broad-Based Communications Ltd, Genelo Investments Limited, and Sophia Pharmaceuticals Ltd etc.",
      isFounder: true
    }
  ];

  const executiveTeam = [
    { 
      image: "/uploads/Mr.-Godwin-UMENWA-Vice-Chairman-300x300.png",
      name: 'Mr Godwin Umenwa',
      position: 'Vice Chairman' 
    },
    { 
      image: "/uploads/Chief-Taiwo-SHAJOBI-Director-300x300.png",
      name: 'Chief Taiwo Shajobi',
      position: 'Director' 
    },
    { 
      image: "/uploads/Dr-Kelly-Nwagha-PhD-FPSN-Director-300x300.png",
      name: 'Dr. Kelly Nwagha, PhD FPSN', 
      position: 'Director' 
    },
    { 
      image: "/uploads/Engr-Bello-UMMAI-Director-300x300.png",
      name: 'Engr. Bello Ummai', 
      position: 'Director' 
    }
  ];

  const managementTeam = [
    { 
      image: "/uploads/COSMAS-Blessing-Ada-Head-HR_Admin-300x300.png",
      name: 'Cosmas Blessing Ada',
      position: 'Head, HR/Admin' 
    },
    { 
      image: "/uploads/NWOKO-Onyeka-Mgt.-Accountant--300x300.png",
      name: 'Nwoko Onyeka', 
      position: 'Mgt Accountant' 
    },
    { 
      image: "/uploads/OKAFOR-Chris-AGM-FM_E--300x300.png",
      name: 'Okafor Chris', 
      position: 'AGM (FM&E)' 
    },
    { 
      image: "/uploads/Pharm-Simeon-OKECHUKWU-AGM-Sales-300x300.png",
      name: 'Pharm. Simeon Okechukwu', 
      position: 'AGM (Sales)' 
    },
    { 
      image: "/uploads/Pharm-Nwamaka-NZEWI-300x300.png",
      name: 'Pharm Amaka Nzewi', 
      position: 'AGM (SE)' 
    },
    { 
      image: "/uploads/Pharm-Abimbola-BOWOTO-AGM-Sales_Mktg-300x300.png",
      name: 'Pharm. Abimbola Bowoto', 
      position: 'AGM (Sales & Marketing)' 
    },
    { 
      image: "/uploads/Pharm-Omeda-Geneith-Pharmaceuticals-Limited-1-300x300.png",
      name: 'Pharm. Columba O. Omeda', 
      position: 'PM (Reg)' 
    },
    { 
      image: "/uploads/Pharm-Judith-UDEH-PM-Mktg-300x300.png",
      name: 'Pharm. Judith Udeh', 
      position: 'PM (Marketing)' 
    },
    { 
      image: "/uploads/NWAFOR-Ujunwa-Mgr.-Accounts-300x300.png",
      name: 'Nwafor Ujunwa', 
      position: 'Mgr Accounts' 
    },
    { 
      image: "/uploads/ACHONYE-Chima-Mgr.-Line.png",
      name: 'Achonye Chima', 
      position: 'Mgr Line II' 
    },
    { 
      image: "/uploads/EZEOKEKE-Eunice-Asst.-Mgr.-Creams_FMCG-300x300.png",
      name: 'Ezeokeke Eunice', 
      position: 'Asst. Mgr (Creams & FMCG)' 
    }
  ];


  return (
    <div>
      <section className="max-w-7xl mx-auto py-16 px-7 md:px-0 ">
        <div className="text-center">
          <h1>About Geneith Pharmaceuticals</h1>
          <p className=" mt-3 max-w-3xl mx-auto">
            Geneith Pharmaceuticals Limited is committed to improving the lives of patients through innovative, high-quality pharmaceutical products and services since 2000.
          </p>
        </div>
        <div className=" mt-20 flex flex-col md:flex-row gap-5">
          <div className=" md:w-1/2 px-7 md:px-0 ">
            <div className=" flex items-center gap-3 mb-5">
              <LuCalendar className=" text-3xl text-primary"/>
              <h2>Company Overview</h2>
            </div>
            <p>
              Geneith Pharmaceuticals Limited was incorporated under the Company and Allied Matters Act (CAMA) 1990 on the Nineteenth day of January in the year 2000 as a Private Limited Liability Company limited by share.
            </p>

            <p className=" py-3">
              The name of the company was initially Geneith Global Limited but the special resolution of the Board of Directors was changed to Geneith Pharmaceuticals Limited on the twelfth day of September 2007.
            </p>

            <p>
              The Company has its corporate head office at No. 12 Adewale Crescent, Off Oshodi-Apapa Expressway, Oshodi, Lagos. However, we are strategically located in the Six Geopolitical Regions of the Federation.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image 
              src={ videobanner}
              alt="videobanner"
            />
          </div>
        </div>
      </section>


      <section className=" py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-7 md:px-0 ">
          <div className=" flex flex-col md:flex-row gap-8">
            <div className=" flex flex-col  bg-card p-6 sm:p-8 rounded-2xl shadow-lg flex-1">
              <div className=" flex items-center gap-6">
                <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                  <LuTarget  className="  text-2xl text-white"/>
                </div>
                <div><h3 className=" mt-9 mb-8">Our Mission</h3></div>
              </div>
              <p>
                "To aid the attainment of excellent healthcare standard by employing the best available technological resources to deliver innovative, high-quality products to the satisfaction of end-user"
              </p>
            </div>
            <div className=" flex flex-col  bg-card p-6 sm:p-8 rounded-2xl shadow-lg flex-1">
              <div className=" flex items-center gap-6">
                <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                  <LuTarget  className="  text-2xl text-white"/>
                </div>
                <div><h3 className=" mt-9 mb-8">Our Vision</h3></div>
              </div>
              <p>
                "To be an integral part of the healthcare delivery system by being a vital and dependable source of affordable, high quality and innovative products".
              </p>
            </div>
          </div>

          <div className=" text-center my-16">
            <h2>Our Core Values</h2>
            <p className=" mt-3 max-w-3xl mx-auto">
              These values are implemented in every aspect of the Company and combined with our deep understanding of the market
            </p>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className=" flex flex-col items-center justify-center text-center bg-card p-6 sm:p-8 rounded-2xl shadow-lg"> 
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <FiAward className="  text-2xl text-white"/>
              </div>
              <h3 className=" mt-9 mb-8">Integrity</h3>
              <p>
                We maintain the highest ethical standards in all our operations, ensuring transparency and trust in every interaction..
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center text-center bg-card p-6 sm:p-8 rounded-2xl shadow-lg"> 
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <LuTarget  className="  text-2xl text-white"/>
              </div>
              <h3 className=" mt-9 mb-8">Commitment</h3>
              <p>
                Dedicated to improving healthcare outcomes through consistent quality and reliable service delivery.
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center text-center bg-card p-6 sm:p-8 rounded-2xl shadow-lg"> 
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <FaRegHeart   className="  text-2xl text-white"/>
              </div>
              <h3 className=" mt-9 mb-8">Innovation</h3>
              <p>
                Continuously advancing pharmaceutical science to develop better, more accessible healthcare solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" max-w-7xl mx-auto py-16 px-7 md:px-0 ">
        <div className="text-center">
          <h2>Corporate Social Responsibility</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            In the spirit of free enterprise, our business must earn a reasonable profit for the welfare of our employees and perform our dues and responsibilities as a good corporate citizen of this country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-12 ">
          {/* item 1 */}
          <div className=" flex gap-5 bg-light-gray rounded-2xl  p-8 ">
            <div className="">
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <FiUser  className="  text-2xl text-white"/>
              </div>
            </div>
            <div className="">
              <h3>To Employees</h3>
              <p>
                Our employees are our most valuable resources. We provide them with a work environment that will protect their health, promote their well-being, develop their potential, and instill in them the pride to work for this organization.
              </p>
            </div>
          </div>

          {/* item 2 */}
          <div className=" flex gap-5 bg-light-gray rounded-2xl  p-8">
            <div className="">
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <LuHandshake  className="  text-2xl text-white"/>
              </div>
            </div>
            <div className="">
              <h3>To Customers and Partners</h3>
              <p>
                Our Customers are Kings and Queens. We recognize the importance of truly knowing our customers, of understanding their needs, aspirations, and lifestyles in order to create the right kind of quality products that are of value to them.
              </p>
            </div>
          </div>

          {/* item 3 */}
          <div className=" flex gap-5 bg-light-gray rounded-2xl  p-8">
            <div className="">
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <PiBuildingOffice  className="  text-2xl text-white"/>
              </div>
            </div>
            <div className="">
              <h3>To Suppliers</h3>
              <p>
                We recognize and treat them as invaluable business partners and continually monitor their performance in the area of quality, and service cost-effectiveness. Fairness, honesty, confidentiality, and mutual respect form the basis for a long-term synergistic business relationship.
              </p>
            </div>
          </div>

          {/* item 4 */}
          <div className=" flex gap-5 bg-light-gray rounded-2xl  p-8">
            <div className="">
              <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center">
                <FaRegHeart  className="  text-2xl text-white"/>
              </div>
            </div>
            <div className="">
              <h3>
                To Society
              </h3>
              <p>
                Beyond providing Nigerians with products for a happy and healthy life, Geneith believes in being a good corporate citizen deeply concerned and committed to the wellbeing of the community and society in which it operates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className=" bg-light-gray pt-16">
        <div className="text-center">
          <h2>Our Leadership Team</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            Meet the experienced professionals who guide Geneith Pharmaceuticals toward excellence in healthcare delivery.
          </p>
        </div>
        {/* CEO Spotlight */}
        <div className=" max-w-7xl mx-auto px-7 md:px-0 mt-14">
          {leadership.map((leadership, index) => (
            <div key={index} className=" flex flex-col md:flex-row gap-6 rounded-b-3xl md:rounded-b-none md:rounded-r-3xl shadow">
              <div className="flex-1">
                <Image
                  src={leadership.image}
                  alt={leadership.image}
                  width={600}
                  height={600}
                  className=" h-[300px] md:h-[660px] w-full object-cover rounded-t-3xl md:rounded-t-none md:rounded-l-3xl "
                />
              </div>
              <div className=" flex-1 py-8 px-6">
                <div className=" bg-primary rounded-2xl text-white px-4 font-medium">
                  <p>{leadership.highlight}</p>
                </div>
                <span>{leadership.isFounder}</span>
                <h2 className="mt-3">{leadership.name}</h2>
                <label className=" text-secondary">{leadership.position}</label>
                <p className=" mt-3">{leadership.bio1}</p>
                <p className=" my-3.5">{leadership.bio2}</p>
                <p>{leadership.bio3}</p>
                <p className=" mt-3.5">{leadership.bio4}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Director */}
        <div className="max-w-7xl mx-auto py-20 px-7 md:px-0">
          <h3 className=" text-center">Board of Directors</h3>

          <div className=" grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-6 mt-9">
            {executiveTeam.map((executiveTeam, index) => (
              <div key={index} className=" relative">
                <Image
                  src={executiveTeam.image}
                  alt={executiveTeam.name}
                  width={360}
                  height={360}
                  className=" rounded-2xl relative mx-auto"
                />
                <div className=" absolute bottom-6 left-16 md:left-28 py-3 px-4 w-56 md:w-80 text-center border-b-2 border-b-primary bg-white shadow">
                  <h4>{executiveTeam.name}</h4>
                  <p>{executiveTeam.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mgt. */}
        <div className="max-w-7xl mx-auto py-20 px-7 md:px-0 ">
          <h3 className=" text-center">Management Team</h3>

          <div className=" grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-y-10 md:gap-y-4  mt-9">
            {managementTeam.map((managementTeam, index) => (
              <div key={index} className="w-full">
                <Image
                  src={managementTeam.image}
                  alt={managementTeam.name}
                  width={260}
                  height={260}
                  className=" rounded-t-2xl w-[90%] mx-auto"
                />
                <div className="py-3 px-4 w-[90%] mx-auto text-center border-b-2 border-b-primary bg-white shadow">
                  <h4>{managementTeam.name}</h4>
                  <label className=" text-secondary">{managementTeam.position}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner & Regulatory Approvals */}
      <section className="max-w-7xl mx-auto py-16 px-7 md:px-0">
        <div className="text-center">
          <h2>We Work With The Best Partners</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            We view our partners as an extension of our team, playing an important part in our go-to-market strategy and overall success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          <div className=" flex flex-col items-center gap-5 bg-light-gray rounded-2xl py-5">
            <Image 
              src={medicalAssociation}
              alt="Nigerian Medical Association"
            />
            <span className=" font-medium">Nigerian Medical Association</span>
          </div>

          <div className=" flex flex-col items-center gap-5 bg-light-gray rounded-2xl py-5 px-3 text-center">
            <Image 
              src={associationHospital}
              alt="National Association of Hospital and Administrative Pharmacists of Nigeria"
            />
            <span className=" font-medium">National Association of Hospital and Administrative Pharmacists of Nigeria</span>
          </div>

          <div className=" flex flex-col items-center gap-5 bg-light-gray rounded-2xl py-5 px-4 text-center">
            <Image 
              src={communityPharmacists}
              alt="Association of Community Pharmacists of Nigeria"
            />
            <span className=" font-medium ">Association of Community Pharmacists of Nigeria</span>
          </div>
        </div>
      </section>
    </div>
  )
}
