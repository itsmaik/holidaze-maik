import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@api/services/AuthServices";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import MyVenuesList from "./MyVenuesList";
import MyBookingsList from "./MyBookingsList";
import Modal from "@components/globals/Modal";
import CreateVenue from "@components/venues/actions/create-venue/CreateVenue";
import { ProfileBookingsHeaders } from "@utils/functions/bookingHeaders";
import EditProfileForm from "@components/profile/EditProfileForm";

export default function ProfileComponent() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [isVenueOpen, setVenueOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  const {userName} = useAuth();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["userProfile", userName],
    queryFn: () => fetchUserProfile(userName as string),
    enabled: !!userName,
  });

  
  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Failed to load profile</p>;

  return (
    
    <div className="relative w-full mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-green-300 to-red-400 rounded-t-lg">
        <img
          src={profile.banner?.url || "https://via.placeholder.com/1200x400"}
          alt={profile.banner?.alt || "Profile Banner"}
          className="w-full h-full object-cover rounded-t-lg"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={profile.avatar.url}
            alt={profile.avatar.alt}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 text-center">
        <h1 className="text-xl font-semibold">{profile.name}</h1>
        <p className="text-gray-600">{profile.email}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button onClick={() => setEditProfileOpen(true)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
          Edit Profile
        </button>
        {profile.venueManager && 
          <button onClick={() => setVenueOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Venue
         </button>
        }
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <nav className="flex justify-start border-b">
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600" onClick={() => setActiveTab("bookings")}>
            My Bookings
          </button>
          {profile.venueManager && 
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600" onClick={() => setActiveTab("venues")}>
            My Venues
          </button>
          }
        </nav>
        <div className="mt-8">
          {/* Tab content here */}
          {activeTab === "venues" && <MyVenuesList venues={profile.venues} />}
          {activeTab === "bookings" && <MyBookingsList bookings={profile.bookings} headers={ProfileBookingsHeaders} />}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between p-6">
        <Modal
          isOpen={isVenueOpen}
          onClose={() => setVenueOpen(false)}
          title='Create a new Venue'
          >
          <CreateVenue />
        </Modal>
        <Modal
          isOpen={isEditProfileOpen}
          onClose={() => setEditProfileOpen(false)}
          title='Edit Profile'
          >
          <EditProfileForm />
        </Modal>
      </div>
    </div>
  );
}
