import { Profile } from "@/components/profile/Profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Navigation } from "@/components/navigation/Navigation";

const ProfilePage = () => {
  return (
    <>
      <ProfileHeader />
      <Profile />
      <Navigation />
    </>
  );
};

export default ProfilePage;