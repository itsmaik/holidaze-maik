type ProfileHeaderProps = {
  bannerUrl?: string;
  bannerAlt?: string;
  avatarUrl: string;
  avatarAlt: string;
  name: string;
  email: string;
};

export default function ProfileHeader({ bannerUrl, bannerAlt, avatarUrl, avatarAlt, name, email }: ProfileHeaderProps) {
  return (
    <div className="relative h-48 bg-gradient-to-r from-green-300 to-red-400 rounded-t-lg">
      <img
        src={bannerUrl || "https://via.placeholder.com/1200x400"}
        alt={bannerAlt || "Profile Banner"}
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <img
          src={avatarUrl}
          alt={avatarAlt}
          className="w-32 h-32 rounded-full border-4 border-white object-cover"
        />
      </div>
      <div className="mt-16 text-center">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
}
