import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "@api/services/AuthServices";
import { useAuth } from "@hooks/useAuth";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import CreateVenueModal from "./CreateVenueModal";
import EditProfileModal from "./EditProfileModal";
import { useState, useEffect } from "react";

export default function ProfileComponent() {
  const [activeTab, setActiveTab] = useState("bookings");
  const { userName } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userName) {
      queryClient.invalidateQueries({ queryKey: ["userProfile", userName] });
    }
  }, [userName, queryClient]);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userName],
    queryFn: () => fetchUserProfile(userName as string),
    enabled: !!userName,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Failed to load profile</p>;

  return (
    <div className='relative w-full mx-auto mt-10 p-4 bg-white shadow rounded-lg'>
      <ProfileHeader
        bannerUrl={profile.banner?.url}
        bannerAlt={profile.banner?.alt}
        avatarUrl={profile.avatar.url}
        avatarAlt={profile.avatar.alt}
        name={profile.name}
        email={profile.email}
      />
      <div className='mt-36 flex justify-center space-x-4'>
        <EditProfileModal />
        {profile.venueManager && <CreateVenueModal />}
      </div>
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isVenueManager={profile.venueManager}
        venues={profile.venues}
        bookings={profile.bookings}
      />
    </div>
  );
}
