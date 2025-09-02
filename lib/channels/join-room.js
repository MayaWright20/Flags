import { supabase } from '../supabase';

const TABLE_NAME = 'guess_the_flag_multiplayer';

// export const deleteMessage = async (messageID) => {
//   const { data, error } = await supabase
//     .from(TABLE_NAME)
//     .delete()
//     .eq('id', messageID);

//   if (error) {
//     console.error('error', error);
//   }
// };

export const insertWrittenAnswer = async (answer) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ written_answer: answer });

  if (error) {
    console.error('error', error);
  }
};

export const insertAnswer = async (answer) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert({ answer });

  if (error) {
    console.error('error', error);
  }
};
