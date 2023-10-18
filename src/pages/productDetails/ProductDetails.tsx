import React, { useState } from "react";
import { HeartAdd, Location, Star1 } from "iconsax-react";
import FacilityIcons from "../../components/ItemMap.tsx/icons";
import Button from "../../components/UI/Button";
import { BookingButton } from "./components/BookingButton";
import { BookedDatesList } from "./components/BookingList";
import { DateRangePicker } from "./components/DateRange";
import Display from "./components/Display";
import { useStoreDispatch } from "../../store/FavoriteContext";

interface InfoProps {
  productInfo: any;
}

interface Booking {
  startDate: Date;
  endDate: Date;
  username: string;
  event: string;
}

const ProductDetail: React.FC<InfoProps> = ({ productInfo }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [username, setUsername] = useState("User");
  const [event, setEventName] = useState("party");
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your store

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    if (!isInWatchlist) {
      // Dispatch the action to add the room to the watchlist
      storeDispatch({ type: "ADD_TO_WATCHLIST", payload: productInfo });
    
  };
  };

  const handleBookRoom = () => {
    if (selectedStartDate && selectedEndDate) {
      const isAvailable = bookedDates.every(
        (booking) =>
          selectedStartDate < booking.startDate ||
          selectedEndDate < booking.startDate ||
          selectedStartDate > booking.endDate ||
          selectedEndDate > booking.endDate
      );

      if (isAvailable) {
        const timeDifference = selectedEndDate.getTime() - selectedStartDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        const price = productInfo.price * daysDifference;

        setBookedDates([...bookedDates, { startDate: selectedStartDate, endDate: selectedEndDate, event, username }]);
        setIsBooked(true);
        setCalculatedPrice(price);
      } else {
        alert("The selected date range is not available.");
      }
    }
  };

  const media = [
    { type: "image", url: productInfo.images[0], alt: productInfo.name },
    { type: "video", url: productInfo.videos[0], alt: productInfo.name },
  ];

  return (
    <>
      <div className="flex w-full m-auto md:flex-row flex-col gap-3 mt-4">
        <div className="md:w-1/2 w-full md:my-2 md:mx-0 my-2 mx-auto px-3">
          <Display media={media} />
        </div>
        <div className="md:w-1/3 mt-5 px-5 md:p-0 flex-col flex gap-3">
          <div className="flex justify-between">
            <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
            <div className="flex items-center cursor-pointer gap-1">
              <Star1 size={17} color={"gold"} />
              <div className="font-semibold">{productInfo.rate}</div>
              <div className="star">star</div>
            </div>
          </div>

          <div>
            <span className="text-green-700 font-semibold text-xl">NGN</span>
            <span className="text-lg">{' '}{productInfo.price}{' '}</span>
            <span className="text-gray-400 font-light text-sm">/Day</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Location size={20} color="red" />
              <div className="location text-lg">{productInfo.location}</div>
            </div>
            <Button variant="primary" className="flex rounded-md items-center text-white gap-1" onClick={toggleWatchlist}>
              <HeartAdd size={14} />
              <div className=" text-xs">{isInWatchlist ? "Remove from Favourites" : "Add to Favourites"}</div>
            </Button>
          </div>
          <div className="flex-col flex mt-3">
            <div className="des font-semibold">Description</div>

            <p className="text-base text-gray-600 w-95 text-justify">{productInfo.des}</p>
          </div>

          <div>
            <div className=" font-semibold">Facilities</div>
            <div className="flex justify-between gap-3 mt-2">
              {productInfo.facilities.map((item: any) => (
                <div key={item.index}>
                  <FacilityIcons iconName={item.title} /> {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        {isBooked ? (
          <p>
            You booked {productInfo.name} from {selectedStartDate?.toDateString()} to {selectedEndDate?.toDateString()}. Calculated Price: ${calculatedPrice}
          </p>
        ) : (
          <div className="md:w-7/12 w-10/12 mt-5 m-auto p-4 border">
            <div className="text-2xl font-semibold m-auto w-fit uppercase">Booking form</div>

            <div className="md:flex gap-2 items-center p-2">
              <label className=" text-xl">Event Name</label>
              <input
                type="text"
                value={event}
                onChange={(e) => setEventName(e.target.value)}
                className="border p-2 rounded-md uppercase bg-transparent"
              />
            </div>

            <DateRangePicker onStartDateChange={setSelectedStartDate} onEndDateChange={setSelectedEndDate} />

            <div className="md:flex gap-2 items-center p-2">
              <label className=" text-xl">Book By</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded-md uppercase bg-transparent"
              />
            </div>
            <BookingButton startDate={selectedStartDate} endDate={selectedEndDate} onBook={handleBookRoom} />
          </div>
        )}
        <BookedDatesList bookedDates={bookedDates} />
      </div>
    </>
  );
};

export default ProductDetail;
