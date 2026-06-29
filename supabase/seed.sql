-- ============================================================
-- Seed-Daten: 11 Rezepte
-- WICHTIG: Ersetze 'DEINE-USER-ID' mit deiner echten Supabase
--          Auth User-ID (Authentication > Users im Dashboard)
-- ============================================================

DO $$
DECLARE
  v_author uuid := 'f7420b32-f96f-4f9c-9361-b85d7e9eed2c'::uuid;

  -- Rezept-IDs
  r01 uuid := gen_random_uuid(); -- Spinat-Spätzlepfanne
  r02 uuid := gen_random_uuid(); -- Gnocchi mit Avocado-Basilikum-Pesto
  r03 uuid := gen_random_uuid(); -- Selterskuchen
  r04 uuid := gen_random_uuid(); -- Grießbrei von Großmutter
  r05 uuid := gen_random_uuid(); -- Käse-Lauch-Suppe mit Hackfleisch
  r06 uuid := gen_random_uuid(); -- Waffeln
  r07 uuid := gen_random_uuid(); -- Indisches Butter Chicken aus dem Ofen
  r08 uuid := gen_random_uuid(); -- Russischer Zupfkuchen
  r09 uuid := gen_random_uuid(); -- Gnocchi-Spinat-Auflauf mit Hähnchen
  r10 uuid := gen_random_uuid(); -- Hähnchen-Ananas-Curry mit Reis
  r11 uuid := gen_random_uuid(); -- Crêpeteig
BEGIN

-- ============================================================
-- RECIPES
-- ============================================================
INSERT INTO recipes (id, title, description, category, difficulty, duration, servings, calories, protein, carbs, fat, image_url, author_id) VALUES
(r01, 'Spinat-Spätzlepfanne', 'Herzhafte Pfanne mit selbstgemachten Spätzle und frischem Blattspinat in cremiger Knoblauch-Sahnesauce – schnell gemacht und unglaublich lecker.', 'Abendessen', 'Mittel', 30, 4, 520, 22, 58, 23, NULL, v_author),
(r02, 'Gnocchi mit Avocado-Basilikum-Pesto', 'Zarte Gnocchi mit einem cremigen, schnell zubereiteten Pesto aus reifen Avocados, frischem Basilikum und Pinienkernen – vegetarisch und in 20 Minuten fertig.', 'Abendessen', 'Einfach', 20, 2, 580, 12, 65, 32, NULL, v_author),
(r03, 'Selterskuchen', 'Saftiger Blechkuchen, der durch Mineralwasser besonders locker und leicht wird. Ein unkompliziertes Grundrezept, das immer gelingt.', 'Dessert', 'Einfach', 50, 12, 280, 5, 42, 11, NULL, v_author),
(r04, 'Grießbrei von Großmutter', 'Cremiger, wohliger Grießbrei nach Omas Rezept – mit Milch, Butter und einem Hauch Vanille. Perfektes Wohlfühlessen für Jung und Alt.', 'Frühstück', 'Einfach', 15, 2, 280, 10, 45, 7, NULL, v_author),
(r05, 'Käse-Lauch-Suppe mit Hackfleisch', 'Sämige, herzhafte Suppe mit Hackfleisch, Lauch und Schmelzkäse – ein echter Klassiker, der die ganze Familie satt macht.', 'Mittagessen', 'Einfach', 30, 4, 480, 28, 12, 36, NULL, v_author),
(r06, 'Waffeln', 'Knusprige, goldbraune Waffeln nach bewährtem Grundrezept – außen knusprig, innen fluffig. Mit Puderzucker, Sahne oder Früchten servieren.', 'Frühstück', 'Einfach', 30, 4, 360, 9, 48, 16, NULL, v_author),
(r07, 'Indisches Butter Chicken aus dem Ofen', 'Zartes Hähnchen in einer aromatischen Tomatensauce mit Butter, Sahne und indischen Gewürzen – ein mildes, cremiges Curry aus dem Ofen.', 'Abendessen', 'Mittel', 60, 4, 520, 38, 18, 32, NULL, v_author),
(r08, 'Russischer Zupfkuchen', 'Saftiger Schokoladenkuchen mit einer cremigen Quarkmasse, die beim Backen charakteristische Tupfen bildet – ein unwiderstehlicher Klassiker.', 'Dessert', 'Mittel', 90, 12, 320, 7, 38, 16, NULL, v_author),
(r09, 'Gnocchi-Spinat-Auflauf mit Hähnchen und Curry', 'Einfacher Auflauf mit Gnocchi, zartem Hähnchen und Spinat in einer würzigen Currysahne, überbacken mit goldbraunem Käse.', 'Abendessen', 'Einfach', 40, 4, 560, 32, 55, 22, NULL, v_author),
(r10, 'Hähnchen-Ananas-Curry mit Reis', 'Fruchtiges, mildes Curry mit saftigem Hähnchen und Ananas in Kokosmilch – süß-würzig und in 30 Minuten auf dem Tisch.', 'Abendessen', 'Einfach', 30, 4, 490, 33, 58, 14, NULL, v_author),
(r11, 'Crêpeteig', 'Perfekter Grundteig für dünne, zarte Crêpes – vielseitig als süße oder herzhafte Variante verwendbar. Mit kurzer Ruhezeit besonders geschmeidig.', 'Frühstück', 'Einfach', 30, 4, 250, 8, 35, 9, NULL, v_author);

-- ============================================================
-- INGREDIENTS
-- ============================================================

-- r01: Spinat-Spätzlepfanne
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r01, 1, 'Spätzle (frisch oder aus dem Kühlregal)', 500, 'g'),
(r01, 2, 'Blattspinat (TK)', 300, 'g'),
(r01, 3, 'Zwiebel', 1, 'Stück'),
(r01, 4, 'Knoblauchzehen', 2, 'Stück'),
(r01, 5, 'Schlagsahne', 200, 'ml'),
(r01, 6, 'Parmesan (gerieben)', 50, 'g'),
(r01, 7, 'Olivenöl', 2, 'EL'),
(r01, 8, 'Salz', 1, 'TL'),
(r01, 9, 'Pfeffer', 0.5, 'TL'),
(r01, 10, 'Muskatnuss (gemahlen)', 0.25, 'TL');

-- r02: Gnocchi mit Avocado-Basilikum-Pesto
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r02, 1, 'Gnocchi', 500, 'g'),
(r02, 2, 'Avocados (reif)', 2, 'Stück'),
(r02, 3, 'Basilikum (frisch)', 1, 'Bund'),
(r02, 4, 'Knoblauchzehe', 1, 'Stück'),
(r02, 5, 'Zitronensaft', 2, 'EL'),
(r02, 6, 'Parmesan (gerieben)', 30, 'g'),
(r02, 7, 'Olivenöl', 3, 'EL'),
(r02, 8, 'Pinienkerne', 30, 'g'),
(r02, 9, 'Salz', 1, 'TL'),
(r02, 10, 'Pfeffer', 0.5, 'TL');

-- r03: Selterskuchen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r03, 1, 'Mehl (Type 405)', 300, 'g'),
(r03, 2, 'Zucker', 150, 'g'),
(r03, 3, 'Eier (Gr. M)', 3, 'Stück'),
(r03, 4, 'Pflanzenöl', 150, 'ml'),
(r03, 5, 'Mineralwasser (mit Kohlensäure)', 150, 'ml'),
(r03, 6, 'Backpulver', 1, 'Pck'),
(r03, 7, 'Vanillezucker', 1, 'Pck'),
(r03, 8, 'Salz', 1, 'Prise'),
(r03, 9, 'Puderzucker zum Bestäuben', 20, 'g');

-- r04: Grießbrei von Großmutter
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r04, 1, 'Vollmilch', 500, 'ml'),
(r04, 2, 'Weichweizen-Grieß', 60, 'g'),
(r04, 3, 'Zucker', 2, 'EL'),
(r04, 4, 'Butter', 1, 'EL'),
(r04, 5, 'Vanillezucker', 1, 'Pck'),
(r04, 6, 'Salz', 1, 'Prise'),
(r04, 7, 'Zimt (gemahlen)', 0.5, 'TL');

-- r05: Käse-Lauch-Suppe mit Hackfleisch
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r05, 1, 'gemischtes Hackfleisch', 500, 'g'),
(r05, 2, 'Lauch (Stangen)', 2, 'Stück'),
(r05, 3, 'Schmelzkäse (z.B. Kiri oder Laughing Cow)', 200, 'g'),
(r05, 4, 'Gemüsebrühe', 1000, 'ml'),
(r05, 5, 'Zwiebel', 1, 'Stück'),
(r05, 6, 'Butter', 1, 'EL'),
(r05, 7, 'Paprikapulver (edelsüß)', 1, 'TL'),
(r05, 8, 'Salz', 1, 'TL'),
(r05, 9, 'Pfeffer', 0.5, 'TL');

-- r06: Waffeln
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r06, 1, 'Mehl (Type 405)', 200, 'g'),
(r06, 2, 'Butter (weich)', 100, 'g'),
(r06, 3, 'Zucker', 80, 'g'),
(r06, 4, 'Eier (Gr. M)', 2, 'Stück'),
(r06, 5, 'Milch', 200, 'ml'),
(r06, 6, 'Backpulver', 1, 'TL'),
(r06, 7, 'Vanillezucker', 1, 'Pck'),
(r06, 8, 'Salz', 1, 'Prise'),
(r06, 9, 'Puderzucker zum Bestäuben', 20, 'g');

-- r07: Indisches Butter Chicken aus dem Ofen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r07, 1, 'Hähnchenbrust', 800, 'g'),
(r07, 2, 'Butter', 50, 'g'),
(r07, 3, 'Tomaten (Dose, gehackt)', 400, 'g'),
(r07, 4, 'Schlagsahne', 200, 'ml'),
(r07, 5, 'Naturjoghurt', 150, 'g'),
(r07, 6, 'Zwiebel', 1, 'Stück'),
(r07, 7, 'Knoblauchzehen', 3, 'Stück'),
(r07, 8, 'Ingwer (frisch, gerieben)', 2, 'cm'),
(r07, 9, 'Garam Masala', 2, 'TL'),
(r07, 10, 'Kurkuma', 1, 'TL'),
(r07, 11, 'Paprikapulver (edelsüß)', 2, 'TL'),
(r07, 12, 'Salz', 1, 'TL'),
(r07, 13, 'Zucker', 1, 'TL'),
(r07, 14, 'Öl', 1, 'EL');

-- r08: Russischer Zupfkuchen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r08, 1, 'Mehl (Type 405)', 300, 'g'),
(r08, 2, 'Kakao (ungesüßt)', 4, 'EL'),
(r08, 3, 'Zucker', 200, 'g'),
(r08, 4, 'Butter (kalt, gewürfelt)', 200, 'g'),
(r08, 5, 'Backpulver', 1, 'TL'),
(r08, 6, 'Ei (für den Teig)', 1, 'Stück'),
(r08, 7, 'Magerquark', 500, 'g'),
(r08, 8, 'Eier (für die Füllung)', 3, 'Stück'),
(r08, 9, 'Vanillezucker', 2, 'Pck'),
(r08, 10, 'Speisestärke', 1, 'EL'),
(r08, 11, 'Salz', 1, 'Prise');

-- r09: Gnocchi-Spinat-Auflauf mit Hähnchen und Curry
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r09, 1, 'Gnocchi', 500, 'g'),
(r09, 2, 'Hähnchenbrust', 400, 'g'),
(r09, 3, 'Blattspinat (TK, aufgetaut)', 300, 'g'),
(r09, 4, 'Schlagsahne', 200, 'ml'),
(r09, 5, 'Reibekäse (z.B. Gouda)', 100, 'g'),
(r09, 6, 'Zwiebel', 1, 'Stück'),
(r09, 7, 'Knoblauchzehen', 2, 'Stück'),
(r09, 8, 'Currypulver', 2, 'TL'),
(r09, 9, 'Öl', 1, 'EL'),
(r09, 10, 'Salz', 1, 'TL'),
(r09, 11, 'Pfeffer', 0.5, 'TL');

-- r10: Hähnchen-Ananas-Curry mit Reis
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r10, 1, 'Hähnchenbrust', 600, 'g'),
(r10, 2, 'Ananas (Dose, Stücke)', 400, 'g'),
(r10, 3, 'Kokosmilch', 400, 'ml'),
(r10, 4, 'Basmati-Reis', 200, 'g'),
(r10, 5, 'Zwiebel', 1, 'Stück'),
(r10, 6, 'Knoblauchzehen', 2, 'Stück'),
(r10, 7, 'Currypulver', 2, 'TL'),
(r10, 8, 'Öl', 1, 'EL'),
(r10, 9, 'Salz', 1, 'TL'),
(r10, 10, 'Pfeffer', 0.5, 'TL'),
(r10, 11, 'Zucker', 1, 'TL');

-- r11: Crêpeteig
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r11, 1, 'Mehl (Type 405)', 200, 'g'),
(r11, 2, 'Milch', 400, 'ml'),
(r11, 3, 'Eier (Gr. M)', 3, 'Stück'),
(r11, 4, 'Butter (geschmolzen)', 30, 'g'),
(r11, 5, 'Zucker', 1, 'TL'),
(r11, 6, 'Salz', 1, 'Prise'),
(r11, 7, 'Öl oder Butter zum Ausbacken', 2, 'EL');

-- ============================================================
-- INSTRUCTIONS
-- ============================================================

-- r01: Spinat-Spätzlepfanne
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r01, 1, 'Zwiebel und Knoblauch schälen und fein würfeln. Olivenöl in einer großen Pfanne erhitzen und die Zwiebeln darin glasig dünsten. Knoblauch hinzufügen und kurz mitdünsten.'),
(r01, 2, 'Tiefgekühlten Spinat direkt in die Pfanne geben und auftauen lassen. Überschüssige Flüssigkeit bei mittlerer Hitze verdampfen lassen.'),
(r01, 3, 'Sahne angießen und alles aufkochen lassen. Mit Salz, Pfeffer und Muskatnuss würzen.'),
(r01, 4, 'Spätzle in die Pfanne geben und alles gut vermengen. Ca. 3–4 Minuten bei mittlerer Hitze erwärmen.'),
(r01, 5, 'Parmesan unterrühren, nochmals abschmecken und sofort servieren.');

-- r02: Gnocchi mit Avocado-Basilikum-Pesto
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r02, 1, 'Gnocchi nach Packungsanweisung in Salzwasser garen, abgießen und etwas Kochwasser auffangen.'),
(r02, 2, 'Avocados halbieren, Kern entfernen und das Fruchtfleisch in einen Mixer oder eine Schüssel geben.'),
(r02, 3, 'Basilikumblätter, Knoblauch, Zitronensaft, Olivenöl und Parmesan hinzufügen. Alles zu einem cremigen Pesto pürieren. Mit Salz und Pfeffer abschmecken.'),
(r02, 4, 'Pinienkerne in einer trockenen Pfanne goldbraun rösten.'),
(r02, 5, 'Gnocchi mit dem Avocado-Pesto vermengen. Bei Bedarf etwas Kochwasser hinzufügen, um die Konsistenz zu regulieren. Mit Pinienkernen bestreuen und sofort servieren.');

-- r03: Selterskuchen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r03, 1, 'Ofen auf 180 °C Ober-/Unterhitze vorheizen. Ein Backblech (ca. 30×40 cm) mit Backpapier auslegen.'),
(r03, 2, 'Eier und Zucker in einer großen Schüssel cremig aufschlagen. Öl und Mineralwasser hinzufügen und verrühren.'),
(r03, 3, 'Mehl, Backpulver, Vanillezucker und Salz mischen und unter die flüssigen Zutaten sieben und zu einem glatten Teig verrühren.'),
(r03, 4, 'Teig auf das vorbereitete Backblech geben und gleichmäßig verstreichen.'),
(r03, 5, 'Im vorgeheizten Ofen ca. 25–30 Minuten backen, bis der Kuchen goldbraun ist und ein Stäbchen sauber herauskommt.'),
(r03, 6, 'Kuchen vollständig abkühlen lassen und vor dem Servieren mit Puderzucker bestäuben.');

-- r04: Grießbrei von Großmutter
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r04, 1, 'Milch zusammen mit Vanillezucker und einer Prise Salz in einem Topf erhitzen, bis sie fast kocht.'),
(r04, 2, 'Grieß unter ständigem Rühren langsam in die heiße Milch einrieseln lassen.'),
(r04, 3, 'Hitze reduzieren und den Brei unter gelegentlichem Rühren ca. 3–5 Minuten köcheln lassen, bis er die gewünschte Konsistenz erreicht.'),
(r04, 4, 'Butter und Zucker einrühren. Mit Zimt abschmecken.'),
(r04, 5, 'In Schüsseln füllen, mit Zimt bestreuen und sofort servieren. Nach Belieben mit Kompott oder frischen Früchten ergänzen.');

-- r05: Käse-Lauch-Suppe mit Hackfleisch
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r05, 1, 'Zwiebel schälen und fein würfeln. Lauch waschen, in halbe Ringe schneiden.'),
(r05, 2, 'Butter in einem großen Topf erhitzen. Zwiebeln darin glasig dünsten, dann Hackfleisch hinzufügen und krümelig anbraten.'),
(r05, 3, 'Lauch dazugeben und ca. 3 Minuten mitdünsten. Mit Paprikapulver, Salz und Pfeffer würzen.'),
(r05, 4, 'Gemüsebrühe angießen und alles aufkochen lassen. Ca. 10 Minuten bei mittlerer Hitze köcheln.'),
(r05, 5, 'Schmelzkäse in kleinen Stücken hinzufügen und unter Rühren vollständig auflösen lassen.'),
(r05, 6, 'Suppe nochmals abschmecken und heiß servieren.');

-- r06: Waffeln
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r06, 1, 'Weiche Butter mit Zucker und Vanillezucker in einer Schüssel cremig rühren.'),
(r06, 2, 'Eier einzeln unterrühren.'),
(r06, 3, 'Mehl, Backpulver und Salz mischen. Abwechselnd mit der Milch unter die Buttermasse rühren, bis ein glatter Teig entsteht.'),
(r06, 4, 'Waffeleisen vorheizen und leicht fetten. Jeweils 2–3 EL Teig hineingeben und nach Anleitung des Geräts ausbacken, bis die Waffeln goldbraun sind.'),
(r06, 5, 'Fertige Waffeln auf einem Rost kurz abkühlen lassen, damit sie knusprig bleiben. Mit Puderzucker bestäuben und nach Belieben mit Sahne und Früchten servieren.');

-- r07: Indisches Butter Chicken aus dem Ofen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r07, 1, 'Hähnchenbrust in mundgerechte Stücke schneiden. Joghurt mit Garam Masala, Kurkuma, Paprika, Salz und dem Saft einer halben Zitrone vermischen. Hähnchen darin mindestens 30 Minuten (besser über Nacht) marinieren.'),
(r07, 2, 'Ofen auf 200 °C Ober-/Unterhitze vorheizen. Zwiebel, Knoblauch und Ingwer fein hacken.'),
(r07, 3, 'Butter in einem ofenfesten Topf oder Bräter erhitzen. Zwiebeln darin goldbraun anbraten. Knoblauch und Ingwer hinzufügen und kurz mitdünsten.'),
(r07, 4, 'Mariniertes Hähnchen in den Topf geben und von allen Seiten kurz anbraten.'),
(r07, 5, 'Tomaten aus der Dose dazugeben und alles gut vermischen. Zucker und Salz abschmecken.'),
(r07, 6, 'Deckel auflegen (oder Topf mit Alufolie abdecken) und im Ofen ca. 25 Minuten garen.'),
(r07, 7, 'Topf herausnehmen, Sahne einrühren und weitere 10 Minuten ohne Deckel im Ofen garen. Mit Naan oder Reis servieren.');

-- r08: Russischer Zupfkuchen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r08, 1, 'Ofen auf 175 °C Ober-/Unterhitze vorheizen. Eine Springform (26 cm) einfetten und mit Mehl bestäuben.'),
(r08, 2, 'Mehl, Kakao, Zucker (100 g), Backpulver und Salz in einer Schüssel mischen. Kalte Butter in Stücken und das Ei hinzufügen und alles mit den Händen zu einem krümeligen Mürbeteig verkneten. Im Kühlschrank 30 Minuten kühlen.'),
(r08, 3, 'Für die Füllung Quark, Eier, restlichen Zucker (100 g) und Vanillezucker cremig rühren. Speisestärke unterrühren.'),
(r08, 4, 'Zwei Drittel des Mürbeteigs auf dem Boden der Springform ausdrücken und dabei einen Rand hochziehen.'),
(r08, 5, 'Quarkmasse auf den Teig geben und glattstreichen.'),
(r08, 6, 'Restlichen Teig in kleinen Stücken über der Quarkmasse verteilen (zupfen).'),
(r08, 7, 'Im vorgeheizten Ofen ca. 50–60 Minuten backen. Abkühlen lassen und erst dann aus der Form lösen.');

-- r09: Gnocchi-Spinat-Auflauf mit Hähnchen und Curry
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r09, 1, 'Ofen auf 200 °C Ober-/Unterhitze vorheizen. Hähnchenbrust in Würfel schneiden.'),
(r09, 2, 'Öl in einer Pfanne erhitzen. Hähnchen darin rundum anbraten, herausnehmen und beiseitelegen.'),
(r09, 3, 'Zwiebel und Knoblauch in derselben Pfanne glasig dünsten. Aufgetauten Spinat hinzufügen und überschüssige Flüssigkeit verdampfen lassen.'),
(r09, 4, 'Sahne angießen, Currypulver einrühren. Mit Salz und Pfeffer abschmecken.'),
(r09, 5, 'Hähnchen und Gnocchi in die Pfanne geben und alles gut vermengen. In eine gefettete Auflaufform umfüllen.'),
(r09, 6, 'Reibekäse gleichmäßig darüberstreuen und im Ofen ca. 20 Minuten goldbraun überbacken.');

-- r10: Hähnchen-Ananas-Curry mit Reis
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r10, 1, 'Reis nach Packungsanweisung in Salzwasser garen.'),
(r10, 2, 'Hähnchenbrust in Würfel schneiden. Zwiebel und Knoblauch fein würfeln. Ananasstücke aus der Dose abtropfen lassen, Saft auffangen.'),
(r10, 3, 'Öl in einem Wok oder einer großen Pfanne erhitzen. Hähnchen darin goldbraun anbraten und herausnehmen.'),
(r10, 4, 'Zwiebeln und Knoblauch im selben Fett glasig dünsten. Currypulver hinzufügen und kurz anrösten.'),
(r10, 5, 'Kokosmilch und etwas Ananassaft angießen und aufkochen. Ananasstücke und Hähnchen hineingeben.'),
(r10, 6, 'Alles ca. 10 Minuten bei mittlerer Hitze köcheln lassen. Mit Salz, Pfeffer und Zucker abschmecken. Mit Reis servieren.');

-- r11: Crêpeteig
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r11, 1, 'Mehl in eine Schüssel sieben. In der Mitte eine Mulde formen.'),
(r11, 2, 'Eier, Milch, geschmolzene Butter, Zucker und Salz hinzufügen. Alles mit einem Schneebesen zu einem glatten, klümpchenfreien Teig verrühren.'),
(r11, 3, 'Teig zugedeckt mindestens 30 Minuten im Kühlschrank ruhen lassen.'),
(r11, 4, 'Eine beschichtete Pfanne mit etwas Öl oder Butter bei mittlerer Hitze erhitzen. Pro Crêpe ca. 2–3 EL Teig hineingeben und die Pfanne schwenken, damit sich der Teig dünn verteilt.'),
(r11, 5, 'Crêpe ca. 1–2 Minuten backen, bis die Oberfläche trocken ist und der Rand sich leicht löst. Wenden und weitere 30 Sekunden backen. Mit süßen oder herzhaften Füllungen servieren.');

-- ============================================================
-- TAGS
-- ============================================================
INSERT INTO recipe_tags (recipe_id, tag) VALUES
(r01, 'vegetarisch'), (r01, 'Pasta'), (r01, 'schnell'), (r01, 'Spinat'),
(r02, 'vegetarisch'), (r02, 'Gnocchi'), (r02, 'Avocado'), (r02, 'schnell'), (r02, 'Pesto'),
(r03, 'Backen'), (r03, 'Kuchen'), (r03, 'Blechkuchen'), (r03, 'einfach'),
(r04, 'Frühstück'), (r04, 'Klassiker'), (r04, 'vegetarisch'), (r04, 'süß'),
(r05, 'Suppe'), (r05, 'Hackfleisch'), (r05, 'Lauch'), (r05, 'herzhaft'), (r05, 'schnell'),
(r06, 'Frühstück'), (r06, 'Backen'), (r06, 'Waffeln'), (r06, 'süß'), (r06, 'Klassiker'),
(r07, 'Hähnchen'), (r07, 'Curry'), (r07, 'Indisch'), (r07, 'Ofen'), (r07, 'Gewürzt'),
(r08, 'Backen'), (r08, 'Kuchen'), (r08, 'Schokolade'), (r08, 'Quark'), (r08, 'Dessert'),
(r09, 'Auflauf'), (r09, 'Gnocchi'), (r09, 'Hähnchen'), (r09, 'Curry'), (r09, 'Spinat'),
(r10, 'Hähnchen'), (r10, 'Curry'), (r10, 'Ananas'), (r10, 'Kokosmilch'), (r10, 'Reis'),
(r11, 'Frühstück'), (r11, 'Pfannkuchen'), (r11, 'Crêpes'), (r11, 'Grundrezept'), (r11, 'französisch');

END $$;
