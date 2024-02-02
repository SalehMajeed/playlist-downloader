import youtube_dl
import sys
import json

def get_playlist_info(playlist_url):
    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
        'force_generic_extractor': True,
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        playlist_info = ydl.extract_info(playlist_url, download=False)
        return playlist_info
    
def print_playlist_info(playlist_info):
    json_data = json.dumps(playlist_info["entries"])
    print(json_data)
    # for each_entry in playlist_info["entries"]:
        # print(each_entry)

playlist_url = sys.argv[1]
playlist_info = get_playlist_info(playlist_url)
print_playlist_info(playlist_info)
    