import Avatar from "@/app/ui/Avatar";
import { AVATAR_PHOTO_URL } from "./_fixtures";

export function Default() {
	return <Avatar name="Tara Dunmore" picture={{ url: AVATAR_PHOTO_URL }} subtitle="Front end developer" />;
}

export function NoPhoto() {
	return <Avatar name="No photo yet" />;
}
