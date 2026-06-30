-- ============================================================
-- Seed-Daten: 16 Rezepte
-- WICHTIG: Ersetze 'DEINE-USER-ID' mit deiner echten Supabase
--          Auth User-ID (Authentication > Users im Dashboard)
-- ============================================================

DO $$
DECLARE
  v_author uuid := 'f7420b32-f96f-4f9c-9361-b85d7e9eed2c'::uuid;

  -- Rezept-IDs
  r01 uuid := gen_random_uuid(); -- Spinat-Spätzlepfanne
  r02 uuid := gen_random_uuid(); -- Gnocchi mit Avocado-Basilikum-Pesto
  r03 uuid := gen_random_uuid(); -- Flammkuchen Elsässer Art, süß oder herzhaft
  r04 uuid := gen_random_uuid(); -- Kartoffelgratin
  r05 uuid := gen_random_uuid(); -- Selterskuchen
  r06 uuid := gen_random_uuid(); -- Grießbrei von Großmutter
  r07 uuid := gen_random_uuid(); -- Käse-Lauch-Suppe mit Hackfleisch
  r08 uuid := gen_random_uuid(); -- Waffeln
  r09 uuid := gen_random_uuid(); -- Indisches Butter Chicken aus dem Ofen
  r10 uuid := gen_random_uuid(); -- Indisches Naan Brot
  r11 uuid := gen_random_uuid(); -- Russischer Zupfkuchen
  r12 uuid := gen_random_uuid(); -- Königsberger Klopse
  r13 uuid := gen_random_uuid(); -- Gnocchi-Spinat-Auflauf mit Hähnchen und Curry
  r14 uuid := gen_random_uuid(); -- Hähnchen-Ananas-Curry mit Reis
  r15 uuid := gen_random_uuid(); -- Crêpesteig
  r16 uuid := gen_random_uuid(); -- Lasagne
BEGIN

-- ============================================================
-- RECIPES
-- ============================================================
INSERT INTO recipes (id, title, description, category, difficulty, duration, servings, calories, protein, carbs, fat, image_url, author_id) VALUES
(r01, 'Spinat-Spätzlepfanne', 'Cremige Pfanne mit selbstgemachten Spätzle, Champignons und Baby-Spinat in einer würzigen Sahnesauce mit Chili-Kick – schnell gemacht und vegetarisch.', 'Abendessen', 'Einfach', 30, 2, 650, 20, 65, 32, NULL, v_author),
(r02, 'Gnocchi mit Avocado-Basilikum-Pesto', 'Goldbraun gebratene Gnocchi mit einem cremigen Pesto aus reifen Avocados, frischem Basilikum und gemahlenen Mandeln, verfeinert mit gerösteten Kirschtomaten und Parmesan.', 'Abendessen', 'Mittel', 30, 6, 667, 18, 74, 33, NULL, v_author),
(r03, 'Flammkuchen Elsässer Art, süß oder herzhaft', 'Hauchdünner Flammkuchenteig mit Crème fraîche, wahlweise herzhaft mit Speck und Zwiebeln oder süß mit Apfel, Zimt und Mandelblättchen belegt.', 'Abendessen', 'Mittel', 45, 4, 1037, 17, 93, 67, NULL, v_author),
(r04, 'Kartoffelgratin', 'Zarte Kartoffelscheiben in einer würzigen Knoblauch-Sahne-Sauce mit Rosmarin, überbacken mit frisch geriebenem Käse – der perfekte Beilagen-Klassiker.', 'Abendessen', 'Mittel', 50, 2, 533, 16, 37, 35, NULL, v_author),
(r05, 'Selterskuchen', 'Saftiger Rührkuchen, der durch Mineralwasser besonders locker wird, mit einem süßen Zitronenguss und bunten Streuseln.', 'Dessert', 'Einfach', 50, 12, 290, 4, 45, 12, NULL, v_author),
(r06, 'Grießbrei von Großmutter', 'Cremiger, wohliger Grießbrei nach Omas Rezept – mit Milch, Butter und einem Hauch Vanille. Perfektes Wohlfühlessen für Jung und Alt.', 'Frühstück', 'Einfach', 15, 2, 280, 10, 45, 7, NULL, v_author),
(r07, 'Käse-Lauch-Suppe mit Hackfleisch', 'Sämige, herzhafte Suppe mit Hackfleisch, Lauch und Schmelzkäse – ein echter Klassiker, der die ganze Familie satt macht.', 'Mittagessen', 'Einfach', 30, 4, 480, 28, 12, 36, NULL, v_author),
(r08, 'Waffeln', 'Klassischer Waffelteig mit Margarine und Vanillezucker – reicht für ca. 10 knusprige, fluffige Waffeln direkt aus dem Waffeleisen.', 'Frühstück', 'Einfach', 30, 10, 271, 6, 33, 13, NULL, v_author),
(r09, 'Indisches Butter Chicken aus dem Ofen', 'Mariniertes Hähnchen in einer würzigen Tomaten-Sahne-Sauce mit Garam Masala, Honig und Ingwer – mild-cremig und perfekt zu Reis oder Naan.', 'Abendessen', 'Mittel', 120, 2, 580, 38, 18, 36, NULL, v_author),
(r10, 'Indisches Naan Brot', 'Fluffiges Hefe-Fladenbrot mit Joghurt und Ei, traditionell in der heißen Pfanne gebacken – der perfekte Begleiter zu Currys und Saucen.', 'Abendessen', 'Mittel', 115, 6, 230, 7, 38, 5, NULL, v_author),
(r11, 'Russischer Zupfkuchen', 'Saftiger Schokoladenboden mit einer cremigen Vanille-Quark-Füllung, die typischen Tupfen entstehen durch den gezupften Mürbeteig obendrauf.', 'Dessert', 'Einfach', 110, 12, 555, 12, 54, 33, NULL, v_author),
(r12, 'Königsberger Klopse', 'Zarte Fleischklopse aus Rind- und Schweinehack, sanft in Brühe gegart und in einer cremigen Kapernsauce mit Zitrone serviert – ein deutscher Klassiker nach Omas Rezept.', 'Abendessen', 'Mittel', 85, 4, 520, 30, 16, 33, NULL, v_author),
(r13, 'Gnocchi-Spinat-Auflauf mit Hähnchen und Curry', 'Knusprig gebratene Gnocchi mit Hähnchen, cremiger Curry-Spinat-Sauce und überbackenem Mozzarella.', 'Abendessen', 'Mittel', 35, 4, 482, 33, 47, 17, NULL, v_author),
(r14, 'Hähnchen-Ananas-Curry mit Reis', 'Süß-würziges Curry mit zartem Hähnchen, fruchtiger Ananas und cremigem Schmelzkäse, serviert auf Reis.', 'Abendessen', 'Mittel', 35, 2, 1023, 50, 149, 23, NULL, v_author),
(r15, 'Crêpesteig', 'Einfacher Grundteig für klassische französische Crêpes – schnell verrührt und vielseitig für süße oder herzhafte Füllungen.', 'Frühstück', 'Einfach', 20, 10, 190, 7, 21, 8, NULL, v_author),
(r16, 'Lasagne', 'Klassische Lasagne mit herzhafter Bolognese aus Rind- und Schweinehack, cremiger Béchamelsauce und goldbraun überbackenem Käse.', 'Abendessen', 'Mittel', 100, 4, 1122, 42, 66, 55, NULL, v_author);

-- ============================================================
-- INGREDIENTS
-- ============================================================

-- r01: Spinat-Spätzlepfanne
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r01, 1, 'Spätzle', 400, 'g'),
(r01, 2, 'Baby-Spinat', 100, 'g'),
(r01, 3, 'Schlagsahne', 200, 'ml'),
(r01, 4, 'Champignons', 100, 'g'),
(r01, 5, 'Gemüsebrühepulver', 2, 'g'),
(r01, 6, 'Zwiebel', 1, 'Stück'),
(r01, 7, 'Tomate', 1, 'Stück'),
(r01, 8, 'Knoblauchzehe', 1, 'Stück'),
(r01, 9, 'Chilischote (optional, oder etwas Sambal Oelek)', 1, 'Stück'),
(r01, 10, 'Pinienkerne', 10, 'g'),
(r01, 11, 'Salz', 1, 'TL'),
(r01, 12, 'Pfeffer', 0.5, 'TL'),
(r01, 13, 'Öl', 1, 'EL');

-- r02: Gnocchi mit Avocado-Basilikum-Pesto
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r02, 1, 'Avocados (reif)', 2, 'Stück'),
(r02, 2, 'Knoblauchzehen', 2, 'Stück'),
(r02, 3, 'Basilikum (frisch, grob gehackt)', 2, 'Bund'),
(r02, 4, 'Zitrone (Saft davon)', 1, 'Stück'),
(r02, 5, 'Olivenöl', 8, 'EL'),
(r02, 6, 'Mandeln, gemahlene', 100, 'g'),
(r02, 7, 'Salz', 1, 'TL'),
(r02, 8, 'Pfeffer', 0.5, 'TL'),
(r02, 9, 'Gnocchi', 1200, 'g'),
(r02, 10, 'Butter (zum Braten)', 30, 'g'),
(r02, 11, 'Kirschtomaten', 350, 'g'),
(r02, 12, 'Zucker', 2, 'Prise'),
(r02, 13, 'Parmesan, frisch gerieben', 100, 'g');

-- r03: Flammkuchen Elsässer Art, süß oder herzhaft
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r03, 1, 'Mehl', 300, 'g'),
(r03, 2, 'Mineralwasser (mit Kohlensäure)', 125, 'ml'),
(r03, 3, 'Öl (geschmacksneutral)', 4, 'EL'),
(r03, 4, 'Salz', 1, 'Prise'),
(r03, 5, 'Fett für das Blech', 1, 'EL'),
(r03, 6, 'Crème fraîche oder Schmand (herzhafter Belag)', 1, 'Becher'),
(r03, 7, 'Milch oder Sahne (herzhafter Belag)', 50, 'ml'),
(r03, 8, 'Speck oder Katenschinken', 150, 'g'),
(r03, 9, 'Zwiebel (groß)', 1, 'Stück'),
(r03, 10, 'Crème fraîche oder Schmand (süßer Belag)', 1, 'Becher'),
(r03, 11, 'Milch oder Sahne (süßer Belag)', 50, 'ml'),
(r03, 12, 'Äpfel (z. B. Boskoop)', 2, 'Stück'),
(r03, 13, 'Zitronensaft', 1, 'EL'),
(r03, 14, 'Zimtzucker', 80, 'g'),
(r03, 15, 'Mandelblättchen', 50, 'g');

-- r04: Kartoffelgratin
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r04, 1, 'Kartoffeln, vorwiegend festkochend', 500, 'g'),
(r04, 2, 'Milch', 125, 'ml'),
(r04, 3, 'Sahne, süße', 125, 'ml'),
(r04, 4, 'Knoblauchzehe', 1, 'Stück'),
(r04, 5, 'Salz', 1, 'TL'),
(r04, 6, 'Pfeffer', 0.5, 'TL'),
(r04, 7, 'Rosmarin', 1, 'TL'),
(r04, 8, 'Butter für die Form', 10, 'g'),
(r04, 9, 'Käse, frisch gerieben (z. B. Parmesan oder Pecorino)', 3, 'EL');

-- r05: Selterskuchen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r05, 1, 'Eier', 4, 'Stück'),
(r05, 2, 'Weizenmehl', 3, 'Tasse'),
(r05, 3, 'Zucker', 2, 'Tasse'),
(r05, 4, 'Selters (Mineralwasser)', 1, 'Tasse'),
(r05, 5, 'Öl', 1, 'Tasse'),
(r05, 6, 'Backpulver', 1, 'Pck'),
(r05, 7, 'Vanillezucker', 1, 'Pck'),
(r05, 8, 'Puderzucker (für die Glasur)', 0.5, 'Pck'),
(r05, 9, 'Zitronensaft (für die Glasur)', 1, 'EL'),
(r05, 10, 'Zuckerstreusel, bunte (optional)', 1, 'EL');

-- r06: Grießbrei von Großmutter
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r06, 1, 'Vollmilch', 500, 'ml'),
(r06, 2, 'Weichweizen-Grieß', 60, 'g'),
(r06, 3, 'Zucker', 2, 'EL'),
(r06, 4, 'Butter', 1, 'EL'),
(r06, 5, 'Vanillezucker', 1, 'Pck'),
(r06, 6, 'Salz', 1, 'Prise'),
(r06, 7, 'Zimt (gemahlen)', 0.5, 'TL');

-- r07: Käse-Lauch-Suppe mit Hackfleisch
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r07, 1, 'gemischtes Hackfleisch', 500, 'g'),
(r07, 2, 'Lauch (Stangen)', 2, 'Stück'),
(r07, 3, 'Schmelzkäse (z.B. Kiri oder Laughing Cow)', 200, 'g'),
(r07, 4, 'Gemüsebrühe', 1000, 'ml'),
(r07, 5, 'Zwiebel', 1, 'Stück'),
(r07, 6, 'Butter', 1, 'EL'),
(r07, 7, 'Paprikapulver (edelsüß)', 1, 'TL'),
(r07, 8, 'Salz', 1, 'TL'),
(r07, 9, 'Pfeffer', 0.5, 'TL');

-- r08: Waffeln
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r08, 1, 'Eier', 3, 'Stück'),
(r08, 2, 'Zucker', 125, 'g'),
(r08, 3, 'Vanillezucker', 1, 'Pck'),
(r08, 4, 'Margarine', 125, 'g'),
(r08, 5, 'Backpulver', 1, 'TL'),
(r08, 6, 'Mehl', 250, 'g'),
(r08, 7, 'Milch', 250, 'ml'),
(r08, 8, 'Salz', 1, 'Prise'),
(r08, 9, 'Fett für das Waffeleisen', 1, 'EL');

-- r09: Indisches Butter Chicken aus dem Ofen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r09, 1, 'Hähnchenbrust', 500, 'g'),
(r09, 2, 'Paprikapulver', 1, 'TL'),
(r09, 3, 'Limonensaft oder Zitronensaft', 1, 'EL'),
(r09, 4, 'Salz', 1, 'TL'),
(r09, 5, 'Joghurt', 150, 'g'),
(r09, 6, 'Cayennepfeffer', 1, 'TL'),
(r09, 7, 'Garam Masala', 1, 'EL'),
(r09, 8, 'Knoblauchzehe', 1, 'Stück'),
(r09, 9, 'Ingwer (daumengroßes Stück)', 1, 'Stück'),
(r09, 10, 'Butter', 4, 'EL'),
(r09, 11, 'Zwiebel', 1, 'Stück'),
(r09, 12, 'Tomaten, passierte', 500, 'g'),
(r09, 13, 'Zimt', 1, 'TL'),
(r09, 14, 'Salz (für die Sauce)', 1, 'TL'),
(r09, 15, 'Cayennepfeffer (für die Sauce)', 2, 'TL'),
(r09, 16, 'Ingwer, für die Sauce (daumengroßes Stück)', 1, 'Stück'),
(r09, 17, 'Knoblauchzehe (für die Sauce)', 1, 'Stück'),
(r09, 18, 'Honig', 1, 'EL'),
(r09, 19, 'Sahne', 150, 'ml'),
(r09, 20, 'Korianderblätter (optional)', 1, 'Bund');

-- r10: Indisches Naan Brot
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r10, 1, 'Mehl', 500, 'g'),
(r10, 2, 'Milch, lauwarm', 150, 'ml'),
(r10, 3, 'Zucker', 2.5, 'EL'),
(r10, 4, 'Trockenhefe', 2, 'TL'),
(r10, 5, 'Backpulver', 1, 'TL'),
(r10, 6, 'Pflanzenöl', 2, 'EL'),
(r10, 7, 'Vollmilchjoghurt', 150, 'ml'),
(r10, 8, 'Ei (groß)', 1, 'Stück'),
(r10, 9, 'Salz', 1, 'TL'),
(r10, 10, 'Mehl zum Ausrollen', 2, 'EL');

-- r11: Russischer Zupfkuchen
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r11, 1, 'Mehl', 300, 'g'),
(r11, 2, 'Kakaopulver, ungesüßt', 30, 'g'),
(r11, 3, 'Backpulver', 2, 'TL'),
(r11, 4, 'Zucker', 150, 'g'),
(r11, 5, 'Vanillezucker', 1, 'Pck'),
(r11, 6, 'Ei', 1, 'Stück'),
(r11, 7, 'Butter', 150, 'g'),
(r11, 8, 'Fett für die Form', 10, 'g'),
(r11, 9, 'Butter (für die Füllung)', 250, 'g'),
(r11, 10, 'Magerquark', 500, 'g'),
(r11, 11, 'Zucker (für die Füllung)', 200, 'g'),
(r11, 12, 'Vanillezucker (für die Füllung)', 1, 'Pck'),
(r11, 13, 'Eier (für die Füllung)', 3, 'Stück'),
(r11, 14, 'Vanillepuddingpulver', 1, 'Pck'),
(r11, 15, 'Vanilleschote (Mark davon)', 1, 'Stück');

-- r12: Königsberger Klopse
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r12, 1, 'Brötchen, altbacken', 1, 'Stück'),
(r12, 2, 'Wasser oder Milch zum Einweichen', 100, 'ml'),
(r12, 3, 'Zwiebel (groß)', 1, 'Stück'),
(r12, 4, 'Rinderhackfleisch', 250, 'g'),
(r12, 5, 'Schweinehackfleisch', 250, 'g'),
(r12, 6, 'Eier', 2, 'Stück'),
(r12, 7, 'Salz', 1, 'TL'),
(r12, 8, 'Pfeffer', 0.5, 'TL'),
(r12, 9, 'Sardellenpaste (optional)', 1, 'TL'),
(r12, 10, 'Paniermehl (optional)', 2, 'EL'),
(r12, 11, 'Zwiebel, für die Brühe (groß)', 1, 'Stück'),
(r12, 12, 'Fleischbrühe, klare', 1000, 'ml'),
(r12, 13, 'Lorbeerblatt', 1, 'Stück'),
(r12, 14, 'Pimentkörner', 3, 'Stück'),
(r12, 15, 'Pfefferkörner', 3, 'Stück'),
(r12, 16, 'Salz (für die Brühe, nach Bedarf)', 1, 'TL'),
(r12, 17, 'Kapern', 1, 'Glas'),
(r12, 18, 'Margarine oder Butter', 3, 'EL'),
(r12, 19, 'Mehl', 2, 'EL'),
(r12, 20, 'Brühe (vom Kochen der Klopse)', 375, 'ml'),
(r12, 21, 'Sahne', 125, 'ml'),
(r12, 22, 'Zitronensaft', 1, 'EL'),
(r12, 23, 'Zucker', 1, 'TL'),
(r12, 24, 'Salz (für die Sauce)', 0.5, 'TL'),
(r12, 25, 'Pfeffer (für die Sauce)', 0.25, 'TL'),
(r12, 26, 'Eigelb', 1, 'Stück'),
(r12, 27, 'Petersilie (zum Garnieren)', 1, 'Bund');

-- r13: Gnocchi-Spinat-Auflauf mit Hähnchen und Curry
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r13, 1, 'Blattspinat, TK', 200, 'g'),
(r13, 2, 'Sahne', 200, 'g'),
(r13, 3, 'Salz', 1, 'TL'),
(r13, 4, 'Pfeffer', 0.5, 'TL'),
(r13, 5, 'Thai-Currypulver, rotes', 1, 'TL'),
(r13, 6, 'Gemüsebrühe', 200, 'ml'),
(r13, 7, 'Zwiebel', 1, 'Stück'),
(r13, 8, 'Gnocchi', 500, 'g'),
(r13, 9, 'Hähnchenfleisch oder Putenfleisch', 300, 'g'),
(r13, 10, 'Fett zum Braten', 1, 'EL'),
(r13, 11, 'Mozzarella', 125, 'g');

-- r14: Hähnchen-Ananas-Curry mit Reis
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r14, 1, 'Hähnchenbrustfilet oder Putenbrust', 250, 'g'),
(r14, 2, 'Ananasstücke (Dose, Abtropfgewicht)', 340, 'g'),
(r14, 3, 'Sahne', 100, 'ml'),
(r14, 4, 'Sahneschmelzkäse', 100, 'g'),
(r14, 5, 'Frühlingszwiebeln', 2, 'Stück'),
(r14, 6, 'Knoblauchzehen', 2, 'Stück'),
(r14, 7, 'Honig', 1, 'EL'),
(r14, 8, 'Currypulver', 3, 'TL'),
(r14, 9, 'Hühnerbrühepulver oder Gemüsebrühepulver', 1, 'TL'),
(r14, 10, 'Reis (Beutel à 125 g)', 250, 'g'),
(r14, 11, 'Öl', 1, 'EL'),
(r14, 12, 'Salz', 1, 'TL'),
(r14, 13, 'Pfeffer', 0.5, 'TL'),
(r14, 14, 'Chilipulver', 0.25, 'TL');

-- r15: Crêpesteig
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r15, 1, 'Mehl', 250, 'g'),
(r15, 2, 'Milch', 500, 'ml'),
(r15, 3, 'Eier', 4, 'Stück'),
(r15, 4, 'Margarine', 50, 'g'),
(r15, 5, 'Vanillezucker', 1, 'Pck');

-- r16: Lasagne
INSERT INTO ingredients (recipe_id, position, name, amount, unit) VALUES
(r16, 1, 'Zwiebel', 1, 'Stück'),
(r16, 2, 'Knoblauchzehen', 2, 'Stück'),
(r16, 3, 'Petersilie', 1, 'Bund'),
(r16, 4, 'Olivenöl', 2, 'EL'),
(r16, 5, 'Hackfleisch (Rind und Schwein gemischt)', 500, 'g'),
(r16, 6, 'Tomatenmark', 1, 'EL'),
(r16, 7, 'Tomaten, geschälte (Dose)', 800, 'g'),
(r16, 8, 'Rotwein', 75, 'ml'),
(r16, 9, 'Salz', 1, 'TL'),
(r16, 10, 'Pfeffer', 0.5, 'TL'),
(r16, 11, 'Butter (für die Béchamelsauce)', 30, 'g'),
(r16, 12, 'Mehl (für die Béchamelsauce)', 40, 'g'),
(r16, 13, 'Milch', 500, 'ml'),
(r16, 14, 'Salz (für die Béchamelsauce)', 0.5, 'TL'),
(r16, 15, 'Pfeffer (für die Béchamelsauce)', 0.25, 'TL'),
(r16, 16, 'Zitronensaft', 2, 'TL'),
(r16, 17, 'Muskat, frisch gerieben', 1, 'Prise'),
(r16, 18, 'Fett für die Form', 1, 'EL'),
(r16, 19, 'Lasagneplatten', 300, 'g'),
(r16, 20, 'Käse, gerieben (z. B. Gouda, Emmentaler oder Mozzarella)', 200, 'g'),
(r16, 21, 'Butter, in Flocken', 20, 'g');

-- ============================================================
-- INSTRUCTIONS
-- ============================================================

-- r01: Spinat-Spätzlepfanne
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r01, 1, 'Die Champignons in Scheiben schneiden. Die Zwiebel würfeln. Den Knoblauch hacken. Die Chilischote halbieren, entkernen und hacken.'),
(r01, 2, 'Die Pinienkerne ohne Fett in der Pfanne rösten, bis sie leicht braun sind. Zur Seite stellen.'),
(r01, 3, 'Die Spätzle nach Packungsanweisung kochen oder frische nehmen. Dann ca. 5 Minuten in Öl in der Pfanne braten und zur Seite stellen.'),
(r01, 4, 'Champignons, Knoblauch und Zwiebeln ca. 5 Minuten anbraten, dann Chili oder Sambal Oelek dazugeben. Mit der Sahne ablöschen, das Gemüsebrühepulver einrühren und so lange köcheln lassen, bis die Soße die gewünschte Konsistenz hat.'),
(r01, 5, 'Die Tomate würfeln und zusammen mit den Spätzle und dem Spinat in die Pfanne geben. Würzen und kurz mitköcheln. Die Pinienkerne mit untermischen oder darüberstreuen.');

-- r02: Gnocchi mit Avocado-Basilikum-Pesto
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r02, 1, 'Die Avocados halbieren, den Kern entfernen und das Fruchtfleisch aus der Schale nehmen. Knoblauchzehen schälen und mit Avocadofruchtfleisch, Basilikum, Zitronensaft, Mandeln und Olivenöl fein pürieren. Mit Salz und Pfeffer abschmecken.'),
(r02, 2, 'Butter in einer Pfanne erhitzen und die Gnocchi darin goldbraun braten. Beiseitestellen und warm halten.'),
(r02, 3, 'Die Kirschtomaten halbieren, etwas Butter in einer Pfanne erhitzen und die Tomatenhälften mit dem Zucker hinzugeben. Die Hitze reduzieren, dann den Avocado-Pesto und die Gnocchi hinzufügen und alles gut vermischen. Mit Salz und Pfeffer abschmecken.'),
(r02, 4, 'Den Parmesan reiben. Die Gnocchi auf Tellern anrichten und mit Parmesan bestreut servieren.');

-- r03: Flammkuchen Elsässer Art, süß oder herzhaft
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r03, 1, 'Mehl, Öl, Wasser und Salz zu einem glatten, nicht klebenden Teig verarbeiten. Sollte der Teig zu bröselig sein, etwas mehr Öl und Wasser hinzufügen; klebt er, etwas Mehl hinzugeben. Den Teig zu einer Kugel formen und in Frischhaltefolie in den Kühlschrank legen.'),
(r03, 2, 'Den Ofen auf ca. 220 °C Umluft oder 230 °C Ober-/Unterhitze vorheizen.'),
(r03, 3, 'Crème fraîche oder Schmand mit der Sahne oder Milch verrühren und kalt stellen.'),
(r03, 4, 'Den Teig aus dem Kühlschrank nehmen und ca. 3–5 mm dick auf die Größe des Backblechs ausrollen, aufs gefettete oder mit Backpapier ausgelegte Backblech legen. Die Creme gleichmäßig auf dem Teig verteilen.'),
(r03, 5, 'Für den herzhaften Belag Zwiebeln würfeln oder in Halbringe schneiden, den Speck in feine Würfel schneiden und gleichmäßig auf der Creme verteilen.'),
(r03, 6, 'Für den süßen Belag die Äpfel schälen, in dünne Scheiben schneiden und mit etwas Zitronensaft beträufeln. Die Apfelscheiben auf den Teig legen, mit Mandelblättchen bestreuen und mit Zimtzucker bestreuen.'),
(r03, 7, 'Den belegten Teig im heißen Backofen ca. 10–15 Min. backen, bis der Rand braun ist. Den fertigen Flammkuchen teilen und mit Federweißem, Weißwein oder einem Pils servieren.');

-- r04: Kartoffelgratin
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r04, 1, 'Die Kartoffeln schälen und in ca. 2 mm dünne Scheiben schneiden.'),
(r04, 2, 'Milch und Sahne vermischen, Knoblauch fein gehackt oder gepresst dazugeben. Etwas Salz und Pfeffer sowie Rosmarin beifügen und mit den Kartoffelscheiben sanft aufkochen lassen, dann unter häufigem vorsichtigem Rühren ca. 10 Minuten köcheln lassen.'),
(r04, 3, 'Eine Auflaufform mit Butter ausstreichen, die Kartoffelmasse einfüllen und mit Käse bestreuen.'),
(r04, 4, 'Im vorgeheizten Ofen bei 220 °C Ober-/Unterhitze ca. 15–20 Minuten auf der mittleren Schiene überbacken.');

-- r05: Selterskuchen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r05, 1, 'Backofen auf 170 °C vorheizen. Alle Zutaten in eine Rührschüssel geben und zu einem glatten Teig verarbeiten. Den Teig auf das Backblech geben und glatt streichen (Backzeit 30–35 Minuten / E-Herd 170 °C Umluft).'),
(r05, 2, 'Puderzucker mit etwas Zitronensaft zu einem Guss verrühren und den noch warmen Kuchen glasieren.'),
(r05, 3, 'Für Kinder sehr hübsch: Bunte Streusel darauf streuen.');

-- r06: Grießbrei von Großmutter
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r06, 1, 'Milch zusammen mit Vanillezucker und einer Prise Salz in einem Topf erhitzen, bis sie fast kocht.'),
(r06, 2, 'Grieß unter ständigem Rühren langsam in die heiße Milch einrieseln lassen.'),
(r06, 3, 'Hitze reduzieren und den Brei unter gelegentlichem Rühren ca. 3–5 Minuten köcheln lassen, bis er die gewünschte Konsistenz erreicht.'),
(r06, 4, 'Butter und Zucker einrühren. Mit Zimt abschmecken.'),
(r06, 5, 'In Schüsseln füllen, mit Zimt bestreuen und sofort servieren. Nach Belieben mit Kompott oder frischen Früchten ergänzen.');

-- r07: Käse-Lauch-Suppe mit Hackfleisch
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r07, 1, 'Zwiebel schälen und fein würfeln. Lauch waschen, in halbe Ringe schneiden.'),
(r07, 2, 'Butter in einem großen Topf erhitzen. Zwiebeln darin glasig dünsten, dann Hackfleisch hinzufügen und krümelig anbraten.'),
(r07, 3, 'Lauch dazugeben und ca. 3 Minuten mitdünsten. Mit Paprikapulver, Salz und Pfeffer würzen.'),
(r07, 4, 'Gemüsebrühe angießen und alles aufkochen lassen. Ca. 10 Minuten bei mittlerer Hitze köcheln.'),
(r07, 5, 'Schmelzkäse in kleinen Stücken hinzufügen und unter Rühren vollständig auflösen lassen.'),
(r07, 6, 'Suppe nochmals abschmecken und heiß servieren.');

-- r08: Waffeln
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r08, 1, 'Eier, Zucker und Vanillezucker mit einem Handrührgerät auf höchster Stufe 2–3 Minuten verrühren, bis die Mischung heller und cremig wird.'),
(r08, 2, 'Anschließend die Margarine in Stückchen zugeben und zügig zu einem glatten Teig verrühren, bis keine Margarineflöckchen mehr sichtbar sind.'),
(r08, 3, 'Mehl, Backpulver und Salz mischen und abwechselnd mit der Milch zügig unter die Eier-Zucker-Margarine-Masse rühren. Der Teig sollte dickflüssig sein.'),
(r08, 4, 'Waffeleisen auf mittlere bis hohe Hitze vorheizen und mit einem Pinsel oder Küchenpapier beide Seiten dünn mit etwas Öl einfetten. Den Teig portionsweise backen (eine kleine Kelle oder 2–3 EL Teig je Waffel), Deckel sanft schließen und jede Waffel 4–5 Minuten backen, bis sie goldbraun ist. Direkt servieren, im Backofen bei 50 °C warmhalten oder auf einem Kuchengitter auskühlen lassen.');

-- r09: Indisches Butter Chicken aus dem Ofen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r09, 1, 'Die Hähnchenbrust in Stücke schneiden. Aus Paprikapulver, Limonen- bzw. Zitronensaft, Salz, Joghurt, Cayennepfeffer, Garam Masala, Ingwer und Knoblauchzehe eine Marinade herstellen. Das Fleisch mit der Marinade mischen. Mindestens eine Stunde einziehen lassen (besser über Nacht im Kühlschrank).'),
(r09, 2, 'Den Ofen auf 200 °C Ober-/Unterhitze vorheizen, dann das Fleisch in einer Auflaufform für 25 Minuten darin garen.'),
(r09, 3, 'Die Zwiebel klein hacken und in 2 EL Butter glasig anschwitzen. Die passierten Tomaten, den Zimt, Salz, Cayennepfeffer, Ingwer und Knoblauchzehe hinzugeben. Alles 20 Minuten mit Deckel und bei niedriger Temperatur köcheln lassen, gelegentlich umrühren.'),
(r09, 4, 'Die restlichen 2 EL Butter, den Honig und die Sahne hinzufügen, weitere 3 Minuten köcheln. Das Fleisch aus der Marinade nehmen, in die Soße geben, kurz umrühren und 2 Minuten mitköcheln lassen.'),
(r09, 5, 'Dazu passt Reis oder Naan. Wer mag, gibt ganz am Ende noch frisch gehackte Korianderblätter dazu.');

-- r10: Indisches Naan Brot
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r10, 1, 'Milch in eine Schüssel gießen, dann etwas Zucker und Trockenhefe einrühren. An einem warmen Ort ca. 20 Minuten ruhen lassen, bis die Hefe sich aufgelöst hat und die Mischung schaumig wird.'),
(r10, 2, 'Das Mehl in eine große Schüssel geben, Salz und Backpulver untermischen. Restlichen Zucker, die Milch mit der aufgelösten Hefe, das Pflanzenöl, den leicht geschlagenen Joghurt und das leicht geschlagene Ei zufügen. Alles gut 10 Minuten durchkneten, bis der Teig glatt und geschmeidig ist. Die Teigkugel in einer leicht geölten Schüssel mit Frischhaltefolie bedecken und an einem warmen Ort 1 Stunde gehen lassen, bis sie sich verdoppelt.'),
(r10, 3, 'Den Teig erneut durchkneten, in 6 gleich große Kugeln teilen und mit einem Tuch bedecken. Jede Kugel mit etwas Mehl dünn auswallen, tropfenförmig oder rund.'),
(r10, 4, 'Eine Crêpes-Pfanne oder andere große beschichtete Pfanne sehr heiß werden lassen. Erst wenn die Pfanne sehr heiß ist, den Fladen hineingeben. Auf einer Seite braten, bis er Blasen wirft, dann vorsichtig wenden und die andere Seite kurz bräunen.'),
(r10, 5, 'Warm servieren – schmeckt genial zu jeder Art von Curry oder zu Gerichten mit Sauce.'),
(r10, 6, 'Fertige Fladen können auch in Frischhaltefolie eingewickelt und eingefroren werden. Vor dem Servieren ca. 1 Stunde auftauen lassen.');

-- r11: Russischer Zupfkuchen
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r11, 1, 'Das Mehl mit Kakao und Backpulver in einer Rührschüssel mischen. Die übrigen Zutaten für den Teig hinzufügen und alles mit einem Mixer zu einem Teig verarbeiten. Zu einer Kugel formen und in Frischhaltefolie gewickelt mindestens 30 Minuten kaltstellen.'),
(r11, 2, 'Für die Füllung die Butter in einem Topf zerlassen und abkühlen lassen. Den Boden einer 26er Springform fetten. Zwei Drittel des Teiges ausrollen und die Form damit auskleiden, dabei einen ca. 2 cm hohen Rand hochziehen.'),
(r11, 3, 'Den Quark mit Zucker, Vanillezucker, dem Mark einer Vanilleschote, den Eiern, dem Puddingpulver und der zerlassenen Butter mit einem Schneebesen zu einer gebundenen Masse verrühren, in die Form geben und glatt streichen. Den restlichen Teig in kleine Stücke zupfen und auf der Füllung verteilen.'),
(r11, 4, 'Die Form im unteren Drittel des vorgeheizten Backofens bei 180 °C Ober-/Unterhitze ca. 60 Minuten backen. Nach dem Backen den Kuchen in der Form auf einem Kuchenrost erkalten lassen.');

-- r12: Königsberger Klopse
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r12, 1, 'Für die Klopse das Brötchen grob zerkleinern und in einer Schüssel mit Wasser oder Milch übergießen, sodass alles gut bedeckt ist. 5–10 Minuten einweichen lassen.'),
(r12, 2, 'Zwiebel schälen, fein hacken und mit dem Hackfleisch und den Eiern in eine Schüssel geben. Eingeweichtes Brötchen gut ausdrücken, dazugeben und mit Salz, Pfeffer und Sardellenpaste (optional) würzen. Alles zu einer homogenen Masse verkneten. Ist die Masse zu weich, mit Paniermehl abbinden.'),
(r12, 3, 'Eine tennisballgroße Portion (ca. 50 g) von der Masse abnehmen und zwischen den Händen zu einer Kugel rollen. Genauso mit der restlichen Masse verfahren.'),
(r12, 4, 'Für die Brühe Zwiebel schälen, fein hacken und mit der Brühe und den Gewürzen in einem Topf erhitzen. Eventuell mit Salz abschmecken.'),
(r12, 5, 'Die Brühe kurz aufkochen, dann die Klopse hineingeben und leicht köcheln lassen.'),
(r12, 6, 'Nach 10 Minuten Lorbeerblatt, Piment- und Pfefferkörner entfernen und die Klopse weitere 10 Minuten gar ziehen lassen. Dann herausnehmen und abgedeckt warm stellen.'),
(r12, 7, 'Für die Sauce Kapern abgießen und abtropfen lassen. Margarine oder Butter bei mittlerer Hitze in einem Topf schmelzen, das Mehl dazugeben und unter Rühren mit einem Schneebesen kurz erhitzen. Nach und nach unter ständigem Rühren die Brühe dazugeben, sodass eine sämige Sauce entsteht.'),
(r12, 8, 'Kapern und Sahne hinzugeben (die Sauce sollte nun nicht mehr kochen). Mit Zitronensaft, Zucker, Salz und Pfeffer süßsauer abschmecken.'),
(r12, 9, 'Für eine sämige Konsistenz und Glanz die Sauce mit einem Eigelb legieren: das Eigelb mit 4–5 EL Sauce verquirlen und in die heiße, nicht mehr kochende Sauce einrühren. Anschließend die Klopse in die Sauce legen, mit gehackter Petersilie bestreuen und servieren.');

-- r13: Gnocchi-Spinat-Auflauf mit Hähnchen und Curry
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r13, 1, 'Den Spinat in der Sahne aufkochen lassen, mit Salz, Pfeffer und ein wenig rotem Thai-Curry würzen, mit Brühe nach und nach aufgießen.'),
(r13, 2, 'Die Gnocchi mit der gewürfelten Zwiebel kurz knusprig braten, das klein geschnittene Hähnchenfleisch dazugeben und ebenfalls braten.'),
(r13, 3, 'Gnocchi und Fleisch in eine Auflaufform geben, die Spinatsauce darauf verteilen. Den Mozzarella in Scheiben schneiden oder in Stücke rupfen und darüber streuen.'),
(r13, 4, 'Im auf 180 °C Umluft vorgeheizten Backofen ca. 15 Minuten auf der mittleren Schiene goldbraun überbacken.');

-- r14: Hähnchen-Ananas-Curry mit Reis
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r14, 1, 'Den Reis nach Packungsanleitung zubereiten.'),
(r14, 2, 'Das Fleisch häuten, waschen und in spielwürfelgroße Stücke schneiden. Mit etwas Öl in der Pfanne anbraten. Wenn es leicht Farbe bekommt, den Honig dazugeben. In Ringe geschnittene Frühlingszwiebeln und gehackten Knoblauch dazugeben und kurz mit anschwitzen. Die abgetropfte Ananas (Saft auffangen) mit in die Pfanne geben und ebenfalls kurz mitanschwitzen. Den Curry dazugeben und alles kurz durchrösten.'),
(r14, 3, 'Mit Sahne ablöschen. Den Schmelzkäse in Stückchen dazugeben und schmelzen lassen. Alles aufkochen lassen, mit Salz, Pfeffer, Curry, Brühepulver, etwas gemahlenem Chili und dem Ananassaft abschmecken und auf dem Reis servieren.');

-- r15: Crêpesteig
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r15, 1, 'Alle Zutaten verrühren und schon ist der Teig fertig. Mit etwas Fett ist er in der Pfanne ganz einfach zu braten und geht super einfach von der Pfanne ab. Es ist keine extra Crêpes-Pfanne notwendig.');

-- r16: Lasagne
INSERT INTO instructions (recipe_id, step_number, content) VALUES
(r16, 1, 'Für die Bolognese Zwiebel schälen und fein würfeln. Knoblauch schälen und fein hacken. Petersilie waschen, trockenschütteln und fein hacken.'),
(r16, 2, 'Olivenöl in einem breiten Topf stark erhitzen. Hackfleisch hineingeben und 5–7 Min. krümelig anbraten, dabei erst nach 1–2 Min. wenden, damit Röstaromen entstehen. Tritt viel Flüssigkeit aus, die Hitze erhöhen und weiterbraten, bis sie verdampft ist.'),
(r16, 3, 'Zwiebelwürfel zum Hackfleisch geben und 2–3 Min. mitbraten, bis sie glasig sind. Knoblauch und Petersilie dazugeben und 30–60 Sek. mitbraten. Tomatenmark einrühren und 1 Min. mitrösten.'),
(r16, 4, 'Die geschälten Tomaten dazugeben und grob zerdrücken. Optional Rotwein einrühren. Mit Salz und Pfeffer würzen.'),
(r16, 5, 'Die Bolognese ohne Deckel 30–40 Min. leise köcheln lassen, dabei alle 5–10 Min. umrühren und den Bratensatz vom Boden lösen.'),
(r16, 6, 'Für die Béchamelsauce Butter in einem Topf bei mittlerer Hitze schmelzen, Mehl einrühren und 1–2 Min. unter Rühren hell anschwitzen.'),
(r16, 7, 'Die Milch in 3–4 Portionen unter Rühren mit dem Schneebesen zugeben, bis die Sauce glatt ist. 8–12 Min. bei kleiner Hitze sanft köcheln, dabei regelmäßig bis zum Topfboden umrühren. Mit Salz, Pfeffer, Zitronensaft und Muskat abschmecken.'),
(r16, 8, 'Backofen auf 180 °C Ober-/Unterhitze vorheizen, Auflaufform einfetten.'),
(r16, 9, 'Eine Schicht Bolognese auf dem Boden verteilen, darauf Lasagneplatten ohne Überlappung legen. Wieder Bolognese und eine dünne Schicht Béchamel darübergeben, dann erneut Nudelplatten. So weiterschichten, bis alles aufgebraucht ist – die letzte Schicht ist Béchamel.'),
(r16, 10, 'Geriebenen Käse gleichmäßig verteilen und Butter in Flöckchen daraufsetzen.'),
(r16, 11, '35–45 Min. bei 180 °C Ober-/Unterhitze backen, bis die Oberfläche goldbraun ist. Vor dem Anschneiden 10–15 Minuten ruhen lassen.');

-- ============================================================
-- TAGS
-- ============================================================
INSERT INTO recipe_tags (recipe_id, tag) VALUES
(r01, 'vegetarisch'), (r01, 'Pasta'), (r01, 'Pfanne'), (r01, 'Spinat'), (r01, 'Champignons'),
(r02, 'vegetarisch'), (r02, 'Gnocchi'), (r02, 'Avocado'), (r02, 'Pesto'), (r02, 'schnell'),
(r03, 'Flammkuchen'), (r03, 'Blech'), (r03, 'Speck'), (r03, 'Apfel'), (r03, 'herzhaft-süß'),
(r04, 'vegetarisch'), (r04, 'Kartoffeln'), (r04, 'Auflauf'), (r04, 'Beilage'), (r04, 'Käse'),
(r05, 'Backen'), (r05, 'Kuchen'), (r05, 'Blechkuchen'), (r05, 'einfach'),
(r06, 'Frühstück'), (r06, 'Klassiker'), (r06, 'vegetarisch'), (r06, 'süß'),
(r07, 'Suppe'), (r07, 'Hackfleisch'), (r07, 'Lauch'), (r07, 'herzhaft'), (r07, 'schnell'),
(r08, 'Frühstück'), (r08, 'Backen'), (r08, 'Waffeln'), (r08, 'süß'), (r08, 'Klassiker'),
(r09, 'Hähnchen'), (r09, 'Curry'), (r09, 'Indisch'), (r09, 'Ofen'), (r09, 'Gewürzt'),
(r10, 'Indisch'), (r10, 'Brot'), (r10, 'Hefeteig'), (r10, 'Beilage'), (r10, 'vegetarisch'),
(r11, 'Backen'), (r11, 'Kuchen'), (r11, 'Schokolade'), (r11, 'Quark'), (r11, 'Dessert'),
(r12, 'Klassiker'), (r12, 'Hausmannskost'), (r12, 'Hackfleisch'), (r12, 'Kapernsauce'), (r12, 'deutsch'),
(r13, 'Auflauf'), (r13, 'Gnocchi'), (r13, 'Hähnchen'), (r13, 'Curry'), (r13, 'Spinat'),
(r14, 'Hähnchen'), (r14, 'Curry'), (r14, 'Ananas'), (r14, 'Reis'), (r14, 'süß-würzig'),
(r15, 'Frühstück'), (r15, 'Pfannkuchen'), (r15, 'Crêpes'), (r15, 'Grundrezept'), (r15, 'französisch'),
(r16, 'Lasagne'), (r16, 'Italienisch'), (r16, 'Hackfleisch'), (r16, 'Auflauf'), (r16, 'Klassiker');

END $$;
