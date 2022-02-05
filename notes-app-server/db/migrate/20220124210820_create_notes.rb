class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes, id: false, primary_key: :id do |t|
      t.string :id, primary_key: true
      t.string :title
      t.string :body
      t.timestamps

      # Relations
      t.string :folder_id
    end
    add_index :notes, :id
    add_index :notes, :folder_id
  end
end
