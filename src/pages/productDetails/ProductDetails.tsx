import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CloseSquare, HeartAdd, Location, Star1 } from "iconsax-react";
import FacilityIcons from "../../components/ItemMap.tsx/icons";
import Button from "../../components/UI/Button";
import { BookingButton } from "./components/BookingButton";
import Display from "./components/Display";
import PaymentModal from "../Payments/components/PaymentModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useFetchProducts from "../../Hooks/useFetchProduct";

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
  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [username, setUsername] = useState("User");
  const [event, setEventName] = useState("party");
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showPaymentComponent, setShowPaymentComponent] = useState(false);
  const [isBookVisible, setIsBookVisible] = useState(false);
  const { products } = useFetchProducts();

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const [formattedStartDate, setFormattedStartDate] = useState<string | null>(null);
  const [formattedEndDate, setFormattedEndDate] = useState<string | null>(null);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handlePaymentComplete = async () => {
    setShowPaymentComponent(false);

    const bookingId = uuidv4();

    const bookingData = {
      id: bookingId,
      username,
      event,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    };

    try {
      const productId = productInfo.id;
      const product = products.find((p: any) => p.id === productId);

      if (product) {
        product.booking.push(bookingData);

        const response = await axios.put(
          `http://localhost:3003/api/products/${productId}`,
          product,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data) {
          console.error("No data received in response.");
          throw new Error("No data received in response");
        }

        console.log("Product data updated in the database successfully");
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error updating product with booking details:", error);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD HH:mm A");
      setFormattedStartDate(formattedDate);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD HH:mm A");
      setFormattedEndDate(formattedDate);
    }
  };

  const handleBookRoom = () => {
    setIsBooked(!isBooked);
    if (selectedStartDate && selectedEndDate) {
      const startDateTime = moment(selectedStartDate).startOf("day");
      const endDateTime = moment(selectedEndDate).startOf("day");
      const daysDifference = endDateTime.diff(startDateTime, 'days');
      
      if (daysDifference < 0) {
        alert("End date cannot be before the start date.");
        return;
      }
  
      const price = productInfo.price * (daysDifference + 1); // Add 1 to include the first day
  
      setBookedDates([
        ...bookedDates,
        { startDate: startDateTime.toDate(), endDate: endDateTime.toDate(), event, username },
      ]);
      setIsBooked(true);
      setCalculatedPrice(price);
    } else {
      alert("Please select both a start date and an end date.");
    }
  };
    
  const handlePayment = () => {
    setShowPaymentComponent(true);
    setIsBookVisible(!true);
  };
  const media = [
    { type: "image", url: productInfo.images[0], alt: productInfo.name },
    { type: "video", url: productInfo.videos[0], alt: productInfo.name },
  ];

  return (
    <div className="relative w-full p-2">
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
            <Button
              variant="primary"
              className="flex rounded-md items-center text-white gap-1"
              onClick={toggleWatchlist}
            >
              <HeartAdd size={14} />
              <div className="text-xs">
                {isInWatchlist ? "Remove from Favourites" : "Add to Favourites"}
              </div>
            </Button>
          </div>
          <div className="flex-col flex mt-3">
            <div className="des font-semibold">Description</div>
            <p className="text-base text-gray-600 w-95 text-justify">
              {productInfo.des}
            </p>
          </div>
          <div>
            <div className="font-semibold">Facilities</div>
            <div className="flex justify-between gap-3 mt-2">
              {productInfo.facilities.map((item: any) => (
                <div key={item.index}>
                  <FacilityIcons iconName={item.title} /> {item.title}
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsBookVisible(!isBookVisible)}
            className="w-fit m-auto bg-slate-600 rounded-md text-white"
          >
            {isBookVisible ? "Cancel Booking" : "Book Date"}
          </Button>
        </div>
      </div>
      {isBookVisible && (
        <div className="top-28 md:top-16 right-0 bottom-0 border bg-white p-2 items-center h-full md:w-1/4 w-full fixed md:z-10 z-50">
          <CloseSquare
            color="gray"
            onClick={() => setIsBookVisible(!isBookVisible)}
          />
          {isBooked ? (
            <div className="rounded-md gap-1 m-auto h-full md:p-4 p-2 cursor-pointer">
              <div className="w-fit m-auto text-2xl font-light mb-2">
                Booking summary
              </div>
              <div className="border border-gray-400 p-4 rounded-xl">
                <div className="w-full flex gap-2 items-center justify-between">
                  <div className="text-xs md:text-base text-gray-600">Name</div>
                  <div className="uppercase md:text-lg">{username}</div>
                </div>
                <div className="w-full flex gap-2 items-center justify-between">
                  <div className="text-xs md:text-base text-gray-600">Event Type</div>
                  <div className="uppercase md:text-lg">{event}</div>
                </div>
                <div className="w-full flex gap-2 justify-between items-center">
                  <div className="text-xs md:text-base text-gray-600">Hall</div>
                  <div className="uppercase md:text-lg">{productInfo.name}</div>
                </div>
                <div className="items-center mt-3 text-gray-600 flex justify-between">
                  <div className="from w-32 text-center text-gray-600">Start date</div>
                  <div className="w-32 text-center text-gray-600">End date</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="uppercase text-center">{formattedStartDate}</div>
                  <ArrowRight size={16} />
                  <div className="uppercase text-base text-center">{formattedEndDate}.</div>
                </div>
                <div className="items-center mt-3 text-gray-600 flex justify-between">
                  Calculated Price
                  <span className="text-gray-600"> NGN {calculatedPrice}</span>
                </div>
              </div>
              <Button
                variant="primary"
                className="bg-slate-800 p-2 flex w-fit text-white rounded-md m-auto mt-4 items-center gap-2 justify-between"
                onClick={handlePayment}
              >
                <div>Proceed to payment</div>
                <ArrowRight size={16} />
              </Button>
            </div>
          ) : (
            <div className="m-auto h-5/6 gap-3 flex flex-col p-2 rounded-md">
              <div className="text-2xl font-light mx-auto w-fit uppercase">
                Booking form
              </div>
              <div className="border p-2 rounded-lg mt-5 border-gray-400 flex flex-col gap-3">
                <div className="flex gap-2 items-center p-2 justify-between">
                  <label>Event Name</label>
                  <input
                    type="text"
                    value={event}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border p-2 w-40 rounded-md border-gray-400 uppercase bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="start w-fit m-auto">Start Date and Time</div>
                <DatePicker
                className="m-auto w-fit p-2 border rounded-md"
                  selected={selectedStartDate}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd h:mm aa"
                  timeFormat="HH:mm"
                  minDate={new Date()}
                  locale="en"
                  placeholderText="Pick date and time"
                />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="start w-fit m-auto">End Date and Time</div>
                <DatePicker
                 className="m-auto w-fit p-2 border rounded-md"
                  selected={selectedEndDate}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd h:mm aa"
                  timeFormat="HH:mm"
                  minDate={new Date()}
                  locale="en"
                  placeholderText="Pick date and time"
                />
                </div>
                <div className="flex gap-2 items-center p-2 justify-between">
                  <label>Book By</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded-md w-40 uppercase bg-transparent border-gray-400"
                  />
                </div>
              </div>
              <BookingButton
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                onBook={handleBookRoom}
              />
            </div>
          )}
        </div>
      )}
      <PaymentModal
        productName={productInfo.name}
        calculatedPrice={calculatedPrice}
        isOpen={showPaymentComponent}
        onRequestClose={handlePaymentComplete}
        showPaymentComponent={showPaymentComponent}
        setShowPaymentComponent={setShowPaymentComponent}
      />
    </div>
  );
};

export default ProductDetail;
