package main

import (
	"fmt"
	"net/http"
    "log"
	"github.com/leonardchinonso/chat_app_test/pkg/websocket"
	ws "github.com/gorilla/websocket"
)

var openPools = make(map[string]*websocket.Pool)
func serveWs(conn *ws.Conn, pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("Websocket Endpoint Hit")
	client := &websocket.Client{
		Username: "",
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		ws, err := websocket.Upgrade(w,r)
		if err != nil{
			log.Println(err)
			return
		}
		var room = ""
		for{
			_, p, err := ws.ReadMessage()
			if err != nil {
				log.Println(err)
				return
			}
			room = string(p)
			break
		}
		if _, ok := openPools[room]; ok {
			serveWs(ws, openPools[room], w, r)
			return
		}
		pool := websocket.NewPool()
		go pool.Start()
		openPools[room] = pool
		serveWs(ws,pool,w,r)
	})
}

func main() {
	fmt.Println("Chat App")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
