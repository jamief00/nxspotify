import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    UserAddIcon

} from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";




function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
                
            })
        }
    }, [session, spotifyApi]);
    
   //console.log('You selected', playlistId);

    return (
        <div className="text-gray-500 p-5 text-sm border-r 
                        border-gray-900 overflow-y-scroll scrollbar-hide h-screen" >
            <div className="space-y-4">
                
                <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <HomeIcon className="h-5 w-5" />
                    <p>Logout</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>

                {playlists.map((playlist) =>(
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
                        {playlist.name.substring(0,25)}
                    </p>
                ))};


            </div>
        </div>
    )
}

export default Sidebar
