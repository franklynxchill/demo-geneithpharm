import { TfiLocationPin } from "react-icons/tfi";

const MapLocation = () => {
  return (
    <div className="px-4 md:px-0">
      {/* Section Header */}
      <div className="text-center mb-9 mt-9 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">Find Our Location</h2>
        <p className="text-base md:text-lg text-gray-700">
          Visit our head office in Lagos. We're conveniently located in Oshodi with easy access to major transportation routes.
        </p>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden shadow-lg max-w-full mx-auto">
        <div className="w-full aspect-[16/9]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7398308829997!2d3.3423328736500575!3d6.554493322805148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8de53ea45b3d%3A0xfb7cdb622e188b13!2sGeneith%20Pharmaceuticals%20Limited!5e0!3m2!1sen!2sng!4v1763199493257!5m2!1sen!2sng"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 px-5 gap-3 bg-white">
          <div className="bg-primary rounded-lg w-14 h-14 flex justify-center items-center flex-shrink-0">
            <TfiLocationPin className="text-white text-2xl" />
          </div>
          <div>
            <h4 className="font-semibold text-lg md:text-xl">Our Head Office</h4>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              12, Adewale Crescent, Off Ewenla Crescent, Oshodi, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLocation;
