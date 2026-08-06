import Avatar from "@/app/ui/Avatar";
import { AVATAR_PHOTO_URL } from "./_fixtures";

export function Default() {
	return <Avatar name="Tara Dunmore" picture={{ url: AVATAR_PHOTO_URL }} />;
}

export function LongName() {
	return (
		<Avatar
			name="Alexandra Montgomery-Whitfield"
			picture={{ url: AVATAR_PHOTO_URL }}
		/>
	);
}
