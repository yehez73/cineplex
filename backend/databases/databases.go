package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"

	"github.com/spf13/viper"
)

var DB *mongo.Database

// I dunno if this correct to put this on every single file that need environment variable
func init() {
	viper.SetConfigFile("../.env")
	err := viper.ReadInConfig()
	if err != nil {
		panic(err)
	}
}

func Connect() {
	clientOptions := options.Client().ApplyURI(viper.GetString("MONGO_URI"))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	DB = client.Database(viper.GetString("MONGO_DB"))
}