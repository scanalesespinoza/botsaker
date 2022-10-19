package chat

import (
	"fmt"
	"os"
	"github.com/Davincible/gotiktoklive"
)




func initBotsaker() {

	USERNAME := os.Getenv("USERNAME")
	// Create TikTok Instance
	tiktok := gotiktoklive.NewTikTok()

	// Track a TikTok user by username
	live, err := tiktok.TrackUser(USERNAME)
	if err != nil {
		panic(err)
	}

	// Start downloading stream
	// Make sure you have the ffmpeg binary installed, and present in your path.
	if err := live.DownloadStream(); err != nil {
		panic(err)
	}

	// Receive livestream events through the live.Events channel
	for event := range live.Events {
		switch e := event.(type) {

		// You can specify what to do for specific events. All events are listed below.
		case gotiktoklive.UserEvent:
			fmt.Printf("%T : %s %s\n", e, e.Event, e.User.Username)

		// List viewer count
		case gotiktoklive.ViewersEvent:
			fmt.Printf("%T : %d\n", e, e.Viewers)

		// Specify the action for all remaining events
		default:
			fmt.Printf("%T : %+v\n", e, e)
		}
	}	

}