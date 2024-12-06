import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@api/services/AuthServices";
import { useAuth } from "@hooks/useAuth";

export default function ProfileComponent() {
  const {userName} = useAuth();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["userProfile", userName],
    queryFn: () => fetchUserProfile(userName as string),
    enabled: !!userName,
  });
  

  console.log(profile);
  
  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Failed to load profile</p>;

  return (
    <>
      <div className="profile-page">
        <h1>Welcome, {profile?.name}</h1>
        <p>{profile?.bio}</p>
      </div>
    </>
  );
}
