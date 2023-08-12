import Playlist from "./Playlist"
import Artist from "./Artist"
import Song from "./Song"
import User from "./User"
import OTP from "./Otp"
import Genre from "./Genre"
import SongOfPlaylist from "./SongOfPlaylist"
import Follower from "./Follower"
import PlaylistOfUser from "./SongOfUser"
//FK GENREId in table Playlist
Genre.hasMany(Playlist, {
    onUpdate: 'CASCADE',
});
Playlist.belongsTo(Genre);

//FK GENREId in table SONG
Genre.hasMany(Song, {
    onUpdate: 'CASCADE',
});
Song.belongsTo(Genre, {
    onUpdate: 'CASCADE',
});

User.hasMany(Song, {
    onUpdate: 'CASCADE',
});
Song.belongsTo(User, {
    onUpdate: 'CASCADE',
});
///
Playlist.hasMany(Song)
Song.hasMany(Genre)

SongOfPlaylist.belongsTo(Song);
SongOfPlaylist.belongsTo(Playlist);

PlaylistOfUser.belongsTo(Song);
PlaylistOfUser.belongsTo(Playlist);

export default {Artist, Playlist, Song, User, Genre, OTP, SongOfPlaylist, Follower, PlaylistOfUser};