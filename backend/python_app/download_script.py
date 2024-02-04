from pytube import YouTube
import sys

def download_video(url, output_path='.'):
    try:
        yt = YouTube(url)

        video_stream = yt.streams.get_highest_resolution()

        video_stream.download(output_path)

        # print(f"Video downloaded successfully to {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # video_url = input("Enter the YouTube video link: ")
    video_url = sys.argv[1]
    download_video(video_url, output_path='downloads')
