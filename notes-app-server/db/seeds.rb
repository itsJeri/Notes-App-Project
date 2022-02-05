puts "🌱 Seeding folders..."
f1 = Folder.create(id: UUID.new.generate, name: "Artists")
f2 = Folder.create(id: UUID.new.generate, name: "Ruby")
f3 = Folder.create(id: UUID.new.generate, name: "JavaScript")


puts "🌱 Seeding documents..."
n1 = Note.create(id: UUID.new.generate, title: Faker::Artist.name, body: "Is he one of the ninja turtles?", folder: f1)
n2 = Note.create(id: UUID.new.generate, title: "Frank Sinatra", body: "Jokes", folder: f1)
n3 = Note.create(id: UUID.new.generate, title: "ActiveRecord", body: "Made with Sinatra ActiveRecord", folder: f2)
n4 = Note.create(id: UUID.new.generate, title: "React", body: "Made with React JS", folder: f3)

puts "🌱 Seeding tags..."
t1 = Tag.create(id: UUID.new.generate, name: "ruby")
t2 = Tag.create(id: UUID.new.generate, name: "cs")
t3 = Tag.create(id: UUID.new.generate, name: "art")
t4 = Tag.create(id: UUID.new.generate, name: "javascript")
t5 = Tag.create(id: UUID.new.generate, name: "sinatra")

puts "Building Note-Tag relations..."
r1 = NoteTag.create(note: n1, tag: t3)
r2 = NoteTag.create(note: n2, tag: t3)
r3 = NoteTag.create(note: n2, tag: t5)
r4 = NoteTag.create(note: n3, tag: t1)
r5 = NoteTag.create(note: n3, tag: t2)
r6 = NoteTag.create(note: n3, tag: t5)
r7 = NoteTag.create(note: n4, tag: t4)

puts "✅ Done seeding!"
