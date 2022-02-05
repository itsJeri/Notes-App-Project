class CreateNoteTagJoin < ActiveRecord::Migration[6.1]
  def change
    create_table :note_tags, id: false do |t|
      t.string :note_id
      t.string :tag_id
      t.timestamps
    end
    add_index :note_tags, :note_id
    add_index :note_tags, :tag_id
  end
end
