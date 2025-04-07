<?php

namespace App\Filament\Resources\AccountResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CreditsRelationManager extends RelationManager
{
    protected static string $relationship = 'credits';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
               /*  Forms\Components\TextInput::make('user_id')
                    ->required()
                    ->maxLength(255), */
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('user_id')
            ->columns([
                Tables\Columns\TextColumn::make('account.user.email')
                    ->label('Email'),
               /*  Tables\Columns\TextColumn::make('account.user.email')
                    ->label('Email'), */
                Tables\Columns\TextColumn::make('sms_asked')
                    ->label('Nombre de sms commandés'),
                Tables\Columns\TextColumn::make('sms_delivered')
                    ->label('Nombre de sms Livrés')
            ])
            ->filters([
                //
            ])
            ->headerActions([
                //Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->disabled(fn ($record) => $record->sms_delivered > 0),
                //Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
