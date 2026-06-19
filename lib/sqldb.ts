// lib/sqldb.ts — VRAI moteur SQL en mémoire (labo). alasql = SQL en pur JS, zéro compilation.
import alasql from "alasql";

let prete = false;

export function getDb() {
  if (!prete) {
    alasql("CREATE TABLE IF NOT EXISTS users (id INT, email STRING, password STRING, role STRING)");
    alasql("CREATE TABLE IF NOT EXISTS notes (id INT, userId INT, titre STRING, contenu STRING)");
    alasql("CREATE TABLE IF NOT EXISTS comments (id INT, author STRING, html STRING)");

    // on repart propre à chaque (re)chargement du module
    alasql("DELETE FROM users");
    alasql("DELETE FROM notes");
    alasql("DELETE FROM comments");

    // Inclusion du hash
    alasql("INSERT INTO users VALUES (1,'alice@mininotes.test','$2b$10$GGRkihoNeb4t9VsjN9W/su70alSul/pmwCf0dkriC6Hy6UlSV3KFK'user')");
    alasql("INSERT INTO users VALUES (2,'bob@mininotes.test','$2b$10$Caa5Vt.vbnAbe3t3q6S03eQ3H5Il1L3jcObl5f9UhyQjd2vUV1vQy','user')");
    alasql("INSERT INTO users VALUES (3,'admin@mininotes.test','$2b$10$3ivQ6onS1pjdNNVR/tTPO.jWkT9FOWZDfmKAsgnB60X9zEWnzLdO2','admin')");

    // chaque note appartient à un userId (1=alice, 2=bob, 3=admin)
    alasql("INSERT INTO notes VALUES (1,1,'Liste de courses','lait, pain, cafe')");
    alasql("INSERT INTO notes VALUES (2,2,'Idee projet','une appli de notes privees')");
    alasql("INSERT INTO notes VALUES (3,3,'Codes admin','le code du coffre est 4271')"); // note SENSIBLE de l'admin

    alasql("INSERT INTO comments VALUES (1,'Alice','Super appli !')");

    prete = true;
  }
  return alasql; // alasql est appelable : db("SELECT ...")
}