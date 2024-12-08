import MyVenuesList from "./MyVenuesList";
import UserBookingsList from "./UserBookingsList";
import { ProfileBookingsHeaders } from "@utils/functions/bookingHeaders";

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVenueManager: boolean;
  venues: any[];
  bookings: any[];
};

export default function ProfileTabs({ activeTab, setActiveTab, isVenueManager, venues, bookings }: ProfileTabsProps) {
  return (
    <div className="mt-20">
      <nav className="flex justify-start border-b">
        <button
          className={`px-4 py-2 ${activeTab === "bookings" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
        {isVenueManager && (
          <button
            className={`px-4 py-2 ${activeTab === "venues" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            onClick={() => setActiveTab("venues")}
          >
            My Venues
          </button>
        )}
      </nav>
      <div className="mt-8">
        {activeTab === "venues" && <MyVenuesList venues={venues} />}
        {activeTab === "bookings" && <UserBookingsList bookings={bookings} headers={ProfileBookingsHeaders} />}
      </div>
    </div>
  );
}
