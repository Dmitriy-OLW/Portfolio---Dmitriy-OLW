import os
from pathlib import Path
import msvcrt
import sys

def print_directory_tree(start_path, prefix=''):
    # Получаем список всех элементов в директории
    try:
        items = sorted(os.listdir(start_path))
    except PermissionError:
        # Пропускаем директории, к которым нет доступа
        return
    
    for i, item in enumerate(items):
        # Полный путь к элементу
        full_path = os.path.join(start_path, item)
        # Определяем, последний ли это элемент
        is_last = (i == len(items) - 1)
        
        # Выводим текущий элемент
        if is_last:
            print(prefix + '└── ' + item)
            new_prefix = prefix + '    '
        else:
            print(prefix + '├── ' + item)
            new_prefix = prefix + '│   '
        
        # Если это директория, рекурсивно обрабатываем её
        if os.path.isdir(full_path):
            print_directory_tree(full_path, new_prefix)

def wait_for_key_press():
    print("\nНажмите любую клавишу для выхода...")
    if os.name == 'nt':
        msvcrt.getch()


if __name__ == "__main__":
    # Получаем текущую директорию скрипта
    current_dir = Path(__file__).parent.resolve()
    print(f"Дерево директорий для: {current_dir}")
    print_directory_tree(current_dir)
    wait_for_key_press()