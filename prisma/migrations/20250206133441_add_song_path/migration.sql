/*
  Warnings:

  - Added the required column `path` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `song` ADD COLUMN `path` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_SongTag` ADD CONSTRAINT `_SongTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SongTag` ADD CONSTRAINT `_SongTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistSong` ADD CONSTRAINT `_PlaylistSong_A_fkey` FOREIGN KEY (`A`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistSong` ADD CONSTRAINT `_PlaylistSong_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistTag` ADD CONSTRAINT `_PlaylistTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaylistTag` ADD CONSTRAINT `_PlaylistTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
